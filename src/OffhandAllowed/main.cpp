#include <hook.h>
#include <mod.h>
#include <logger.h>
#include <symbol.h>
#include <nativejs.h>

#include <map>

class Item {
	public: 
	int getId() const;
};

std::map<int,bool> ids;

namespace IdConversion {
	enum Scope { ITEM, BLOCK };
	int dynamicToStatic(int dynamicId, Scope scope);
	int staticToDynamic(int staticId, Scope scope);
};

class MainModule : public Module {
public:
	MainModule(const char* id): Module(id) {};
	virtual void initialize(){
		DLHandleManager::initializeHandle("libminecraftpe.so", "mcpe");
		HookManager::addCallback(SYMBOL("mcpe","_ZNK4Item12allowOffhandEv"),LAMBDA((Item* item),{
			int ID = item->getId();
			ID = IdConversion::dynamicToStatic(ID, IdConversion::Scope::ITEM);
			if(ids[ID]){
				return true;
			};
			return false;
		},), HookManager::CALL | HookManager::REPLACE | HookManager::RESULT);
	}
};

class OtherModule : public Module {
public:
	OtherModule(Module* parent, const char* id) : Module(parent, id) {};
};

MAIN {
	Module* main_module = new MainModule("offhand_allowed");
	new OtherModule(main_module, "offhand_allowed.other_module");
    ids.insert(std::pair<int,bool>(741,true));
    ids.insert(std::pair<int,bool>(513,true));
    ids.insert(std::pair<int,bool>(262,true));
};

JS_MODULE_VERSION(OffhandModule, 1);

JS_EXPORT(OffhandModule, allowVanillaItem, "V(I)", (JNIEnv * env, int id) {
ids.insert(std::pair<int,bool>(id,true));
});

//ids.push_back(IdConversion::staticToDynamic(754, IdConversion::Scope::ITEM));

// native js signature rules:
/* signature represents parameters and return type, RETURN_TYPE(PARAMETERS...) example: S(OI)
	return types:
		V - void      - return 0
		I - long int  - wrapIntegerResult
		F - double    - wrapDoubleResult
		S - string    - wrapStringResult
		O - object    - wrapObjectResult
	parameter types:
		I - int (4 bits) 
		L - long (8 bits)
		F - float (4 bits)
		D - double (8 bits)
		B - boolean (1 bit)
		C - char (1 bit)
	as seen, basic call functions cannot receive string and objects for sake of performance, so complex functions come in place
	in case of complex functions parameters are ignored
как видно, базовые функции вызова не могут получать строку и объекты ради производительности, поэтому на место приходят сложные функции
в случае сложных функций параметры игнорируются
	JNIEnv* is always passed as first parameter
*/
