#include <hook.h>
#include <mod.h>
#include <logger.h>
#include <symbol.h>
#include <nativejs.h>
#include "shared_headers/vtable.h"
#include "shared_headers/stl/string"

#include <map>
#include <vector>
#include <regex>

#define stl std::__ndk1

namespace Core {
	class Random {
		public:
		int nextInt(int, int);
		float nextFloat();
	};
};
class ItemStack;
class LootTable {
	public:
	stl::string getDir() const;
};

std::map<std::string, std::vector<std::vector<int>>> itemGenerators;
std::vector<std::string> allTableNames {
	"abandoned_mineshaft",
	"buriedtreasure",
	"desert_pyramid",
	"dispenser_trap",
	"end_city_treasure",
	"igloo_chest",
	"jungle_temple",
	"monster_room",
	"nether_bridge",
	"pillager_outpost",
	"shipwreck",
	"shipwrecksupply",
	"shipwrecktreasure",
	"simple_dungeon",
	"spawn_bonus_chest",
	"stronghold_corridor",
	"stronghold_crossing",
	"stronghold_library",
	"underwater_ruin_big",
	"underwater_ruin_small",
	"village_blacksmith",
	"village_two_room_house",
	"woodland_mansion",
	"village/village_armorer",
	"village/village_butcher",
	"village/village_cartographer",
	"village/village_desert_house",
	"village/village_fletcher",
	"village/village_mason",
	"village/village_plains_house",
	"village/village_savanna_house",
	"village/village_shepherd",
	"village/village_snowy_house",
	"village/village_taiga_house",
	"village/village_tannery",
	"village/village_temple",
	"village/village_toolsmith",
	"village/village_weaponsmith"
};

class LootTableContext;
class Item {
	public: 
	int getId() const;
};
class BlockLegacy;
class Block;
class ItemStack {
	public:
	char filler[256];
	static ItemStack* getById(short, int, int, long long);
};
class Container {
	public:
	int addItem(ItemStack&);
};

namespace ItemRegistry {
	Item* getItemById(int);
};

namespace IdConversion {
    enum Scope {
        ITEM, 
        BLOCK
    };
    int dynamicToStatic(int dynamicId, IdConversion::Scope scope);
    int staticToDynamic(int staticId, IdConversion::Scope scope);
};

std::string getTableName(LootTable* lt){
	stl::string tableDir = lt->getDir();
	std::string tableName = std::regex_replace(std::string(tableDir.c_str()), std::regex("loot_tables/chests/"), "");
	tableName = std::regex_replace(tableName, std::regex(".json"), "");
	return tableName;
};

class MainModule : public Module {
public:
	MainModule(const char* id): Module(id) {};
	virtual void initialize(){
		DLHandleManager::initializeHandle("libminecraftpe.so", "mcpe");
		HookManager::addCallback(SYMBOL("mcpe","_ZN9LootTable4fillER9ContainerR6RandomR16LootTableContext"),LAMBDA((HookManager::CallbackController* controller, LootTable* lt, Container* container, Core::Random* random, LootTableContext* ltc),{
			std::string tableName = getTableName(lt);
			std::vector<std::vector<int>> generationDatas = itemGenerators[tableName];
			for(std::vector<int> generationData : generationDatas){
				if(generationData[2] > random->nextInt(0, 100)){
					ItemStack* itemStack = ItemStack::getById(generationData[0], random->nextInt(generationData[3], generationData[4]), generationData[1], generationData[5]);	
					VTABLE_FIND_OFFSET(setItemOffset, _ZTV16FillingContainer, _ZN16FillingContainer7setItemEiRK9ItemStack)
					VTABLE_CALL<void>(setItemOffset, container, random->nextInt(0, 26), itemStack);
					delete itemStack;
				};
			};
		return controller->call<void>(lt, container, random, ltc);
		},), HookManager::CALL | HookManager::LISTENER | HookManager::CONTROLLER | HookManager::RESULT);
	};
}; 

JS_MODULE_VERSION(ItemGenerationModule, 1);

JS_EXPORT_COMPLEX(ItemGenerationModule, addItemGenerator, "V(SS)", (JNIEnv* env, NativeJS::ComplexArgs obj) {
	std::string tableName(obj.get("tableName").asString());
	for(std::string name : allTableNames){
		if(itemGenerators.find(name) == itemGenerators.end()){
			itemGenerators.insert(std::pair<std::string, std::vector<std::vector<int>>>(name, std::vector<std::vector<int>>()));
		}
	};
	std::vector<int> generatorData;
	int id = obj.get("id").asInt();
	int data = obj.get("data").asInt();
	long extra = obj.get("extra").asPointer();
	int chance = obj.get("chance").asInt();
	int minCount = obj.get("minCount").asInt();
	int maxCount = obj.get("maxCount").asInt();
	if(!id){
		Logger::error("ITEM_GENERATION", "INVALID ITEM ID IS NULL. FAILED ADDING GENERATION");
		return 0;
	};
	generatorData.push_back(id);
	generatorData.push_back(data >= 0 ? data : 0);
	generatorData.push_back(chance > 0 ? chance : 1);
	generatorData.push_back(minCount > 0 ? minCount : 1);
	generatorData.push_back(maxCount > 0 ? maxCount : 1);
	generatorData.push_back(extra);
	std::vector<std::vector<int>> vec = itemGenerators[tableName];
	for(std::vector<int> checkVec : vec){
		if(generatorData == checkVec){
			Logger::error("ITEM_GENERATION", "ITEM GENERATION IS EXIST IN THIS TABLE: {tableName: %s, id: %i, data: %i, chance: %i, minCount: %i, maxCount: %i}", tableName.c_str(), id, data, chance, minCount, maxCount);
			return 0;
		}
	};
	if(tableName != "all"){
		itemGenerators[tableName].push_back(generatorData);
	}
	else {
		for(std::string name : allTableNames){
			std::vector<std::vector<int>> vec2 = itemGenerators[name];
			for(std::vector<int> checkVec2 : vec2){
				if(generatorData == checkVec2){
					Logger::error("ITEM_GENERATION", "ITEM GENERATION IS EXIST IN THIS TABLE: {tableName: %s, id: %i, data: %i, chance: %i, minCount: %i, maxCount: %i}", tableName.c_str(), id, data, chance, minCount, maxCount);
						return 0;
				};
			};
			itemGenerators[name].push_back(generatorData);
		};
		Logger::info("ITEM_GENERATION", "ITEM GENERATION ADDED IN ALL TABLES");
	};
	return 0;
});

class OtherModule : public Module {
public:
	OtherModule(Module* parent, const char* id) : Module(parent, id) {};
};

MAIN {
	Module* main_module = new MainModule("item_generation");
	new OtherModule(main_module, "item_generation.other_module");
};