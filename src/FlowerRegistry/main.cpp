#include <map>
#include <mod.h>
#include "vtable.h"
#include <symbol.h>
#include <nativejs.h>
#include "innercore_callbacks.h"

std::map<int, bool> flowers;

namespace IdConversion {
	enum Scope {
		ITEM, 
		BLOCK
	};
	int dynamicToStatic(int dynamicId, IdConversion::Scope scope);
	int staticToDynamic(int staticId, IdConversion::Scope scope);
};

class BlockLegacy;

namespace BlockRegistry {
	BlockLegacy* getBlockById(int id);
};

class BlockPos {
	public:
	int x, y, z;
	BlockPos(int, int, int);
	int randomSeed() const;
};

class Vec3 {
	public:
	float x, y, z;
	Vec3(float, float, float);
};

class FlowerBlock {
	public:
	Vec3 randomlyModifyPosition(BlockPos const&) const;
};

float randomFloat(float min, float max){
	return min + static_cast <float> (rand()) / (static_cast <float> (RAND_MAX/(max-min)));
};

Vec3 customModifyPosition(FlowerBlock* block, BlockPos const& pos){
	srand(BlockPos(pos.x, 1, pos.z).randomSeed());
	float offset = 0.175;
	float x = pos.x + randomFloat(-offset, offset);
	float z = pos.z + randomFloat(-offset, offset);
	return Vec3(x, pos.y, z);
};

void registerFlower(int id, bool isDoublePlant){
	id = IdConversion::staticToDynamic(id, IdConversion::Scope::BLOCK);
	BlockLegacy* block = BlockRegistry::getBlockById(id);
	void** vtable = *(void***) block;
	VTABLE_FIND_OFFSET(randomlyModifyPosition, _ZTV11BlockLegacy, _ZNK11BlockLegacy22randomlyModifyPositionERK8BlockPos);
	VTABLE_FIND_OFFSET(getAABB, _ZTV11BlockLegacy, _ZNK11BlockLegacy7getAABBER11BlockSourceRK8BlockPosRK5BlockR4AABBb);
	vtable[getAABB] = SYMBOL("mcpe", "_ZNK11FlowerBlock7getAABBER11BlockSourceRK8BlockPosRK5BlockR4AABBb");
	if(!isDoublePlant){
		vtable[randomlyModifyPosition] = SYMBOL("mcpe", "_ZNK11FlowerBlock22randomlyModifyPositionERK8BlockPos");
	} else {
		vtable[randomlyModifyPosition] = ADDRESS(customModifyPosition); //SYMBOL("mcpe", "_ZNK11BambooBlock22randomlyModifyPositionERK8BlockPos");
	}
};

class SomeModule : public Module {
public:
	SomeModule(const char* id): Module(id) {};
	virtual void initialize(){
		DLHandleManager::initializeHandle("libminecraftpe.so", "mcpe");
		Callbacks::addCallback("postModItemsInit", CALLBACK([], (), {
			for(std::pair<int, bool> i : flowers){
				registerFlower(i.first, i.second);
			};
		}));
	};
};

JS_MODULE_VERSION(FlowerModule, 1);

JS_EXPORT(FlowerModule, registerFlower, "V(IB)", (JNIEnv* env, int id, bool isDoublePlant){
	flowers.insert(std::pair<int, bool>(id, isDoublePlant));
});

class SomeOtherModule : public Module {
public:
	SomeOtherModule(Module* parent, const char* id) : Module(parent, id) {};
};

MAIN {
	Module* some_module = new SomeModule("some_module");
	new SomeOtherModule(some_module, "some.other_module");
};