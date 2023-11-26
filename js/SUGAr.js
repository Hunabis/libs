LIBRARY({
	name: "SUGAr",
	version: 1,
	shared: true,
	api: "CoreEngine"
});

IMPORT("BlockEngine");

let Color = android.graphics.Color;

Math.log2 = Math.log2 || function(x) {
	return Math.log(x) / Math.LN2;
};

var __extends = (this && this.__extends) || (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function(d, b) { d.__proto__ = b; }) ||
			function(d, b) {
				for (var p in b)
					if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
			};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null)
			throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);

		function __() { this.constructor = d; }
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {

	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;

	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
	};

function __extendsNamespace(obj, namespace) {
	for (let i in namespace)
		obj[i] = namespace[i];
}

function randKey() {
	return String(java.util.UUID.randomUUID().toString());
}

let _interfaces = randKey();

/*let __implements = (this && this.__implements) || function(clazz) {
	if (!clazz.prototype[_interfaces]) clazz.prototype[_interfaces] = [];
	for (let i = 1; i < arguments.length; i++) {
		if (!arguments[i]) continue;
		clazz.prototype[_interfaces].push(arguments[i]);
		for (let j in arguments[i])(arguments[i][j] !== null && arguments[i][j] !== undefined) ? clazz.prototype[j] = arguments[i][j] :
			Object.defineProperty(clazz.prototype, j, {
				configurable: true,
				enumerable: true,
				get() { throw new Error('Member "' + j + '" of "' + clazz.name + '" is not implemented') },
				set(value) { Object.defineProperty(clazz.prototype, j, { enumerable: true, get() { return value } }) }
			})
	}
};*/

let setTimeout = function(func, ticks){
  var upd = {
    ticks: 0,
      update: function(){
        this.ticks++
          if(this.ticks >= ticks){
            func();
            this.remove = true
      }
    }
  };
  Updatable.addUpdatable(upd);
};

function __interfaceOf(obj, interface, checkWithObj) {
	if (!checkWithObj && obj) obj = obj.constructor;
	if (!obj || !interface || !obj[_interfaces]) return false;
	let result = !!~obj[_interfaces].indexOf(interface);
	if (!result && obj[_interfaces].length > 0)
		for (let i in obj[_interfaces])
			if (__interfaceOf(obj[_interfaces][i], interface, true)) return true;
	return result;
};

function __instanceOf(left, right) {
	return left instanceof right || __interfaceOf(left, right);
};

function __constructorOf(left, right){
	return left == right || (left.__proto__ ? __constructorOf(left.__proto__, right) : false);
};

let Interface = (function() {
	function Interface() {
		this[_interfaces] = [];
		for (let i = 0; i < arguments.length; i++) {
			let _super = arguments[i];
			if (_super && _super instanceof Interface) this[_interfaces].push(_super);
		}

		return this;
	};
	return Interface;
}());

function __implements() {
	let clazz = arguments[0];
	clazz[_interfaces] = [];
	for (let i = 1; i < arguments.length; i++) {
		clazz[_interfaces].push(arguments[i]);
	}
}

let enum_values = randKey();
let enum_name = randKey();

function __enum(constructor, name){
	name = name.toUpperCase();
	if(constructor[name]) throw new Error("dublicate enum value");
	let args = [].slice.call(arguments, 2);
	constructor.prototype.name = function(){
		return this[enum_name] || name;
	};
	constructor.prototype.ordinal = function(){
		let index = constructor[enum_values].indexOf(this);
		return !~index ? constructor[enum_values].length : index;
	};
	if(!constructor[enum_values]) constructor[enum_values] = [];
	constructor[name] = new (constructor.bind.apply(constructor, [constructor].concat(args)))();
	constructor[enum_values].push(constructor[name]);
	constructor[name][enum_name] = name;
	constructor.values = function(){
		return constructor[enum_values];
	};
};

function _fieldGetter(clazz, name, getter){
	Object.defineProperty(clazz, name, {
		get: getter
	});
};

function _fieldSetter(clazz, name, setter){
	Object.defineProperty(clazz, name, {
		set: setter
	});
};

function _fieldGetterAndSetter(clazz, name, getter, setter){
	_fieldGetter(clazz, name, getter);
	_fieldSetter(clazz, name, setter);
}

function _getterFunc(clazz, name, getter){
	let s = name[0].toUpperCase() + name.slice(1);
	clazz.prototype["get" + s] = getter || function(){ return this[name] };
};

function _setterFunc(clazz, name, getter, setter){
	let s = name[0].toUpperCase() + name.slice(1);
	clazz.prototype["set" + s] = setter || function(v){ this[name] = v; return this};
};

function _getterAndSetterFunc(clazz, name, getter, setter){
	_getterFunc(clazz, name, getter);
	_setterFunc(clazz, name, setter);
};

let MathHelper = (function(MathHelper) {
	function hsvToRGB(h, s, v)
	{
		let r, g, b;
		let i = Math.floor(h * 6);
		let f = h * 6 - i;
		let p = v * (1 - s);
		let q = v * (1 - f * s);
		let t = v * (1 - (1 - f) * s);

		switch (i % 6)
		{
			case 0:
				r = v, g = t, b = p;
				break;
			case 1:
				r = q, g = v, b = p;
				break;
			case 2:
				r = p, g = v, b = t;
				break;
			case 3:
				r = p, g = q, b = v;
				break;
			case 4:
				r = t, g = p, b = v;
				break;
			case 5:
				r = v, g = p, b = q;
				break;
		}
		r = clamp(r * 255, 0, 255);
		g = clamp(g * 255, 0, 255);
		b = clamp(b * 255, 0, 255);
		return [r, g, b];
	}
	MathHelper.hsvToRGB = hsvToRGB;

	function RGBToHash(r, g, b) {
		return typeof r == "number" ? (r << 16 | g << 8 | b) : (r[0] << 16 | r[1] << 8 | r[2]);
	};
	MathHelper.RGBToHash = RGBToHash;

	function hsvToHash(h, s, v) {
		if (typeof h == "object") return hsvToHash(h[0], h[1], h[2]);
		return RGBToHash(hsvToRGB(h, s, v));
	};

	function clamp(num, min, max) {
		return num < min ? min : (num > max ? max : num);
	}
	MathHelper.clamp = clamp;

	function lerp(value1, value2, amount) {
		return value1 + (value2 - value1) * amount;
	}
	MathHelper.lerp = lerp;

	function intFloorDiv(f) {
		var f1 = 0.5 * f;
		var i = java.lang.Float.floatToIntBits(f);
		i = 1597463007 - (i >> 1);
		f = java.lang.Float.intBitsToFloat(i);
		f *= 1.5 - f1 * f * f;
		return f;
	}
	MathHelper.intFloorDiv = intFloorDiv;

	function pointDistanceSpace(x1, y1, z1, x2, y2, z2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
	}
	MathHelper.pointDistanceSpace = pointDistanceSpace;

	function frac(number) {
		return number - Math.floor(number);
	}
	MathHelper.frac = frac;

	function smallestEncompassingPowerOfTwo(value){
		let i = value - 1;
		i = i | i >> 1;
		i = i | i >> 2;
		i = i | i >> 4;
		i = i | i >> 8;
		i = i | i >> 16;
		return i + 1;
	}
	MathHelper.smallestEncompassingPowerOfTwo = smallestEncompassingPowerOfTwo;

	function distSqr(a, b) {
		//Vector3i#distSqr, while convenient, offsets the second argument by (0.5, 0.5, 0.5)
		let dx = a.getX() - b.getX();
		let dy = a.getY() - b.getY();
		let dz = a.getZ() - b.getZ();
		return dx * dx + dy * dy + dz * dz;
	}
	MathHelper.distSqr = distSqr;

	return MathHelper;
}(MathHelper || (MathHelper = {})));

let Rotation = (function() {
	const NONE = Rotation.NONE = new Rotation("none");
	const CLOCKWISE_90 = Rotation.CLOCKWISE_90 = new Rotation("clockwise_90");
	const CLOCKWISE_180 = Rotation.CLOCKWISE_180 = new Rotation("clockwise_180");
	const COUNTERCLOCKWISE_90 = Rotation.COUNTERCLOCKWISE_90 = new Rotation("counterclockwise_90");

	function Rotation(name) {
		this.name = name;
	};

	function values() {
		return [NONE, CLOCKWISE_90, CLOCKWISE_180, COUNTERCLOCKWISE_90];
	};
	Rotation.values = values;
	Rotation.prototype.add = function(rotation) {
		switch (rotation) {
			case CLOCKWISE_180:
				switch (this) {
					case NONE:
						return CLOCKWISE_180;
					case CLOCKWISE_90:
						return COUNTERCLOCKWISE_90;
					case CLOCKWISE_180:
						return NONE;
					case COUNTERCLOCKWISE_90:
						return CLOCKWISE_90;
				}
			case COUNTERCLOCKWISE_90:
				switch (this) {
					case NONE:
						return COUNTERCLOCKWISE_90;
					case CLOCKWISE_90:
						return NONE;
					case CLOCKWISE_180:
						return CLOCKWISE_90;
					case COUNTERCLOCKWISE_90:
						return CLOCKWISE_180;
				}
			case CLOCKWISE_90:
				switch (this) {
					case NONE:
						return CLOCKWISE_90;
					case CLOCKWISE_90:
						return CLOCKWISE_180;
					case CLOCKWISE_180:
						return COUNTERCLOCKWISE_90;
					case COUNTERCLOCKWISE_90:
						return NONE;
				}
			default:
				return this;
		}
	};
	Rotation.prototype.rotate = function(a, b) {
		if (a instanceof Direction) {
			let facing = a;
			if (facing.getAxis().isVertical()) {
				return facing;
			} else {
				switch (this) {
					case CLOCKWISE_90:
						return facing.rotateY();
					case CLOCKWISE_180:
						return facing.getOpposite();
					case COUNTERCLOCKWISE_90:
						return facing.rotateYCCW();
					default:
						return facing;
				}
			}
		} else {
			switch (this) {
				case CLOCKWISE_90:
					return (a + b / 4) % b;
				case CLOCKWISE_180:
					return (a + blur / 2) % b;
				case COUNTERCLOCKWISE_90:
					return (a + b * 3 / 4) % b;
				default:
					return a;
			}
		}
	};
	Rotation.prototype.randomRotation = function(rand) {
		return values()[Math.round(Math.random() * (values().length - 1))];
	};

	return Rotation;
}());

let AxisAlignedBB = (function() {

	function AxisAlignedBB(x1, y1, z1, x2, y2, z2) {
		if (typeof x1 === "number" && typeof y1 === "number" && typeof z1 === "number" &&
			typeof x2 === "number" && typeof y2 === "number" && typeof z2 === "number") {
			this.minX = Math.min(x1, x2), this.minY = Math.min(y1, y2), this.minZ = Math.min(z1, z2),
				this.maxX = Math.max(x1, x2), this.maxY = Math.max(y1, y2), this.maxZ = Math.max(z1, z2);
		}
		else if (typeof x1 === "object" && typeof y1 === "object") {
			if (x1 instanceof BlockPos && y1 instanceof BlockPos) {
				return new AxisAlignedBB(x1.getX(), x1.getY(), x1.getZ(), y1.getX(), y1.getY(), y1.getZ());
			}
			else if (x1 instanceof Vec3d && y1 instanceof Vec3d) {
				return new AxisAlignedBB(x1.x, x1.y, x1.z, y1.x, y1.y, y1.z);
			}
		}
		else if (typeof x1 === "object" && typeof y1 !== "object" && x1 instanceof BlockPos) {
			return new AxisAlignedBB(x1.getX(), x1.getY(), x1.getZ(), x1.getX() + 1, x1.getY() + 1, x1.getZ() + 1);
		}
	};

	AxisAlignedBB.prototype.setMaxY = function(y2) {
		return new AxisAlignedBB(this.minX, this.minY, this.minZ, this.maxX, y2, this.maxZ);
	};
	AxisAlignedBB.prototype.equals = function(obj) {
		if (this == obj)
			return true;
		else if (!(obj instanceof AxisAlignedBB))
			return false;
		else {
			var axisalignedbb = obj;
			return java.lang.Double.compare(axisalignedbb.minX, this.minX) != 0 ? false :
				(java.lang.Double.compare(axisalignedbb.minY, this.minY) != 0 ? false :
					(java.lang.Double.compare(axisalignedbb.minZ, this.minZ) != 0 ? false :
						(java.lang.Double.compare(axisalignedbb.maxX, this.maxX) != 0 ? false :
							(java.lang.Double.compare(axisalignedbb.maxY, this.maxY) != 0 ? false :
								(java.lang.Double.compare(axisalignedbb.maxZ, this.maxZ) == 0)))));
		}
	};
	AxisAlignedBB.prototype.hashCode = function() {
		var i = java.lang.Double.doubleToLongBits(this.minX);
		var j = Math.floor(i ^ i >>> 32);
		i = java.lang.Double.doubleToLongBits(this.minY);
		j = 31 * j + Math.floor(i ^ i >>> 32);
		i = java.lang.Double.doubleToLongBits(this.minZ);
		j = 31 * j + Math.floor(i ^ i >>> 32);
		i = java.lang.Double.doubleToLongBits(this.maxX);
		j = 31 * j + Math.floor(i ^ i >>> 32);
		i = java.lang.Double.doubleToLongBits(this.maxY);
		j = 31 * j + Math.floor(i ^ i >>> 32);
		i = java.lang.Double.doubleToLongBits(this.maxZ);
		j = 31 * j + (i ^ i >>> 32);
		return j;
	};
	AxisAlignedBB.prototype.addCoord = function(x, y, z) {
		var d0 = this.minX,
			d1 = this.minY,
			d2 = this.minZ,
			d3 = this.maxX,
			d4 = this.maxY,
			d5 = this.maxZ;
		if (x < 0)
			d0 += x;
		else if (x > 0)
			d3 += x;
		if (y < 0)
			d1 += y;
		else if (y > 0)
			d4 += y;
		if (z < 0)
			d2 += z;
		else if (z > 0)
			d5 += z;
		return new AxisAlignedBB(d0, d1, d2, d3, d4, d5);
	};
	AxisAlignedBB.prototype.expand = function(x, y, z) {
		return new AxisAlignedBB();
	};
	AxisAlignedBB.prototype.expandXyz = function(value) {
		return this.expand(value, value, value);
	};
	AxisAlignedBB.prototype.union = function(other) {
		return new AxisAlignedBB(Math.min(this.minX, other.minX), Math.min(this.minY, other.minY), Math.min(this.minZ, other.minZ), Math.max(this.maxX, other.maxX), Math.max(this.maxY, other.maxY), Math.max(this.maxZ, other.maxZ));
	};
	AxisAlignedBB.prototype.offset = function(x, y, z) {
		if (typeof x === "number") {
			return new AxisAlignedBB(this.minX + x, this.minY + y, this.minZ + z, this.maxX + x, this.maxY + y, this.maxZ + z);
		}
		else if (typeof x === "object" && (x instanceof BlockPos || x instanceof Vec3d)) {
			return new AxisAlignedBB(this.minX + x.getX(), this.minY + x.getY(), this.minZ + x.getZ(), this.maxX + x.getX(), this.maxY + x.getY(), this.maxZ + x.getZ());
		}
	};
	AxisAlignedBB.prototype.calculateXOffset = function(other, offsetX) {
		if (other.maxY > this.minY && other.minY < this.maxY && other.maxZ > this.minZ && other.minZ < this.maxZ) {
			if (offsetX > 0 && other.maxX <= this.minX) {
				var d1 = this.minX - other.maxX;
				if (d1 < offsetX)
					offsetX = d1;
			}
			else if (offsetX < 0 && other.minX >= this.maxX) {
				var d0 = this.maxX - other.minX;
				if (d0 > offsetX)
					offsetX = d0;
			}
			return offsetX;
		}
		else
			return offsetX;
	};
	AxisAlignedBB.prototype.calculateYOffset = function(other, offsetY) {
		if (other.maxX > this.minX && other.minX < this.maxX && other.maxZ > this.minZ && other.minZ < this.maxZ) {
			if (offsetY > 0 && other.maxY <= this.minY) {
				var d1 = this.minY - other.maxY;
				if (d1 < offsetY)
					offsetY = d1;
			}
			else if (offsetY < 0 && other.minY >= this.maxY) {
				var d0 = this.maxY - other.minY;
				if (d0 > offsetY)
					offsetY = d0;
			}
			return offsetY;
		}
		else
			return offsetY;
	};
	AxisAlignedBB.prototype.calculateZOffset = function(other, offsetZ) {
		if (other.maxX > this.minX && other.minX < this.maxX && other.maxY > this.minY && other.minY < this.maxY) {
			if (offsetZ > 0 && other.maxZ <= this.minZ) {
				var d1 = this.minZ - other.maxZ;
				if (d1 < offsetZ)
					offsetZ = d1;
			}
			else if (offsetZ < 0 && other.minZ >= this.maxZ) {
				var d0 = this.maxZ - other.minZ;
				if (d0 > offsetZ)
					offsetZ = d0;
			}
			return offsetZ;
		}
		else
			return offsetZ;
	};
	AxisAlignedBB.prototype.intersectWithRay = function(rayOrigin, rayDirection) {
		const centerX = (this.minX + this.maxX) * 0.5;
		const halfWidth = (this.maxX - this.minX) * 0.5;
		const distanceX = rayOrigin.x - centerX;
		if (Math.abs(distanceX) > halfWidth && distanceX * rayDirection.x >= 0.0) {
			return false;
		} else {
			const centerY = (this.minY + this.maxY) * 0.5;
			const halfHeight = (this.maxY - this.minY) * 0.5;
			const distanceY = rayOrigin.y - centerY;
			if (Math.abs(distanceY) > halfHeight && distanceY * rayDirection.y >= 0.0) {
				return false;
			} else {
				const centerZ = (this.minZ + this.maxZ) * 0.5;
				const halfDepth = (this.maxZ - this.minZ) * 0.5;
				const distanceZ = rayOrigin.z - centerZ;
				if (Math.abs(distanceZ) > halfDepth && distanceZ * rayDirection.z >= 0.0) {
					return false;
				} else {
					const absRayDirX = Math.abs(rayDirection.x);
					const absRayDirY = Math.abs(rayDirection.y);
					const absRayDirZ = Math.abs(rayDirection.z);
					const crossProductYz = rayDirection.y * distanceZ - rayDirection.z * distanceY;
					if (Math.abs(crossProductYz) > halfHeight * absRayDirZ + halfDepth * absRayDirY) {
						return false;
					} else {
						const crossProductZx = rayDirection.z * distanceX - rayDirection.x * distanceZ;
						if (Math.abs(crossProductZx) > halfWidth * absRayDirZ + halfDepth * absRayDirX) {
							return false;
						} else {
							const crossProductXy = rayDirection.x * distanceY - rayDirection.y * distanceX;
							return Math.abs(crossProductXy) < halfWidth * absRayDirY + halfHeight * absRayDirX;
						}
					}
				}
			}
		}
	};
	AxisAlignedBB.prototype.intersectsWith = function(other) {
		return this.intersects(other.minX, other.minY, other.minZ, other.maxX, other.maxY, other.maxZ);
	};
	AxisAlignedBB.prototype.intersects = function(x1, y1, z1, x2, y2, z2) {
		if (typeof x1 === "number" && typeof y1 === "number") {
			return this.minX < x2 && this.maxX > x1 && this.minY < y2 && this.maxY > y1 && this.minZ < z2 && this.maxZ > z1;
		}
		else if (typeof x1 === "object" && x1 instanceof Vec3d && typeof y1 === "object" && y1 instanceof Vec3d) {
			return this.intersects(Math.min(x1.x, y1.x), Math.min(x1.y, y1.y), Math.min(x1.z, y1.z), Math.max(x1.x, y1.x), Math.max(x1.y, y1.y), Math.max(x1.z, y1.z));
		}
	};
	AxisAlignedBB.prototype.contains = function(vec) {
		return vec.x > this.minX && vec.x < this.maxX ?
			(vec.y > this.minY && vec.y < this.maxY ?
				vec.z > this.minZ && vec.z < this.maxZ : false) : false;
	};
	AxisAlignedBB.prototype.getAverageEdgeLength = function() {
		return (this.maxX - this.minX, this.maxY - this.minY, this.maxZ - this.minZ) / 3;
	};
	AxisAlignedBB.prototype.contract = function(value) {
		return this.expandXyz(-value);
	};
	AxisAlignedBB.prototype.grow = function(x, y, z) {
		return new AxisAlignedBB(this.minX - x, this.minY - y, this.minZ - z, this.maxX + x + 1, this.maxY + y + 1, this.maxZ + z + 1);
	};
	AxisAlignedBB.prototype.calculateIntercept = function(vecA, vecB) {
		let vec3d = this.collideWithXPlane(this.minX, vecA, vecB);
		let enumfacing = Direction.WEST;
		let vec3d1 = this.collideWithXPlane(this.maxX, vecA, vecB);
		if (vec3d1 != null && this.isClosest(vecA, vec3d, vec3d1)) {
			vec3d = vec3d1;
			enumfacing = Direction.EAST;
		}

		vec3d1 = this.collideWithYPlane(this.minY, vecA, vecB);
		if (vec3d1 != null && this.isClosest(vecA, vec3d, vec3d1)) {
			vec3d = vec3d1;
			enumfacing = Direction.DOWN;
		}

		vec3d1 = this.collideWithYPlane(this.maxY, vecA, vecB);
		if (vec3d1 != null && this.isClosest(vecA, vec3d, vec3d1)) {
			vec3d = vec3d1;
			enumfacing = Direction.UP;
		}

		vec3d1 = this.collideWithZPlane(this.minZ, vecA, vecB);
		if (vec3d1 != null && this.isClosest(vecA, vec3d, vec3d1)) {
			vec3d = vec3d1;
			enumfacing = Direction.NORTH;
		}

		vec3d1 = this.collideWithZPlane(this.maxZ, vecA, vecB);
		if (vec3d1 != null && this.isClosest(vecA, vec3d, vec3d1)) {
			vec3d = vec3d1;
			enumfacing = Direction.SOUTH;
		}

		return vec3d;
	};
	AxisAlignedBB.prototype.isClosest = function(vec1, vec2, vec3) {
		return vec2 == null || vec1.squareDistanceTo(vec3) < vec1.squareDistanceTo(vec2);
	};
	AxisAlignedBB.prototype.collideWithXPlane = function(n, vecA, vecB) {
		let vec3d = vecA.getIntermediateWithXValue(vecB, n);
		return vec3d != null && this.intersectsWithYZ(vec3d) ? vec3d : null;
	};
	AxisAlignedBB.prototype.collideWithYPlane = function(n, vecA, vecB) {
		let vec3d = vecA.getIntermediateWithYValue(vecB, n);
		return vec3d != null && this.intersectsWithXZ(vec3d) ? vec3d : null;
	};
	AxisAlignedBB.prototype.collideWithZPlane = function(n, vecA, vecB) {
		let vec3d = vecA.getIntermediateWithZValue(vecB, n);
		return vec3d != null && this.intersectsWithXY(vec3d) ? vec3d : null;
	};
	AxisAlignedBB.prototype.intersectsWithYZ = function(vec) {
		return vec.y >= this.minY && vec.y <= this.maxY && vec.z >= this.minZ && vec.z <= this.maxZ;
	};
	AxisAlignedBB.prototype.intersectsWithXZ = function(vec) {
		return vec.x >= this.minX && vec.x <= this.maxX && vec.z >= this.minZ && vec.z <= this.maxZ;
	};
	AxisAlignedBB.prototype.intersectsWithXY = function(vec) {
		return vec.x >= this.minX && vec.x <= this.maxX && vec.y >= this.minY && vec.y <= this.maxY;
	};
	AxisAlignedBB.prototype.toString = function() {
		return "box[" + this.minX + ", " + this.minY + ", " + this.minZ + " -> " + this.maxX + ", " + this.maxY + ", " + this.maxZ + "]";
	};
	AxisAlignedBB.prototype.toArray = function() {
		return [this.minX, this.minY, this.minZ, this.maxX, this.maxY, this.maxZ];
	};
	AxisAlignedBB.prototype.hasNaN = function() {
		return java.lang.Double.isNaN(this.minX) ||
			java.lang.Double.isNaN(this.minY) ||
			java.lang.Double.isNaN(this.minZ) ||
			java.lang.Double.isNaN(this.maxX) ||
			java.lang.Double.isNaN(this.maxY) ||
			java.lang.Double.isNaN(this.maxZ);
	};
	AxisAlignedBB.prototype.getCenter = function() {
		return new Vec3d(this.minX + (this.maxX - this.minX) * 0.5, this.minY + (this.maxY - this.minY) * 0.5, this.minZ + (this.maxZ - this.minZ) * 0.5);
	};

	return AxisAlignedBB;
}());

let Vec2f = (function() {
	function Vec2f(xIn, yIn) {
		this.x = xIn;
		this.y = yIn;
	}
	Vec2f.ZERO = new Vec2f(0, 0);
	Vec2f.ONE = new Vec2f(1, 1);
	Vec2f.UNIT_X = new Vec2f(1, 0);
	Vec2f.NEGATIVE_UNIT_X = new Vec2f(-1, 0);
	Vec2f.UNIT_Y = new Vec2f(0, 1);
	Vec2f.NEGATIVE_UNIT_Y = new Vec2f(0, -1);
	Vec2f.MAX = new Vec2f(java.lang.Float.MAX_VALUE, java.lang.Float.MAX_VALUE);
	Vec2f.MIN = new Vec2f(java.lang.Float.MIN_VALUE, java.lang.Float.MIN_VALUE);
	return Vec2f;
}());

let Vec3i = (function() {

	function Vec3i(xIn, yIn, zIn) {
		this.x = Math.floor(xIn), this.y = Math.floor(yIn), this.z = Math.floor(zIn);
	};

	Vec3i.prototype.equals = function(obj) {
		if (this == obj)
			return true;
		else if (!(obj instanceof Vec3i))
			return false;
		else {
			var vec3i = obj;
			return this.getX() != vec3i.getX() ? false :
				(this.getY() != vec3i.getY() ? false :
					this.getZ() == vec3i.getZ());
		}
	};
	Vec3i.prototype.hashCode = function() {
		return (this.getY() + this.getZ() * 31) * 31 + this.getX();
	};
	Vec3i.prototype.compareTo = function(toCompare) {
		return this.getY() == toCompare.getY() ?
			(this.getZ() == toCompare.getZ() ? this.getX() - toCompare.getX() :
				this.getZ() - toCompare.getZ()) : this.getY() - toCompare.getY();
	};
	Vec3i.prototype.getX = function() { return this.x; };;
	Vec3i.prototype.getY = function() { return this.y; };;
	Vec3i.prototype.getZ = function() { return this.z; };;
	Vec3i.prototype.crossProduct = function(vec) {
		return new Vec3i(this.getY() * vec.getZ() - this.getZ() * vec.getY(), this.getZ() * vec.getX() - this.getX() * vec.getZ(), this.getX() * vec.getY() - this.getY() * vec.getX());
	};
	Vec3i.prototype.getDistance = function(xIn, yIn, zIn) {
		return Math.sqrt(this.distanceSq(xIn, yIn, zIn));
	};
	Vec3i.prototype.distanceSq = function(toX, toY, toZ) {
		if (typeof toX === "number") {
			return Math.pow(this.getX() - toX, 2) + Math.pow(this.getY() - toY, 2) + Math.pow(this.getZ() - toZ, 2);
		}
		else if (typeof toX === "object" && toX instanceof Vec3i) {
			return this.distanceSq(toX.getX(), toX.getY(), toX.getZ());
		}
	};
	Vec3i.prototype.distanceSqToCenter = function(xIn, yIn, zIn) {
		return this.distanceSq(xIn + 0.5, yIn + 0.5, zIn + 0.5);
	};
	Vec3i.prototype.toString = function() {
		return this.getX() + ", " + this.getY() + ", " + this.getZ();
	};
	Vec3i.NULL_VECTOR = new Vec3i(0, 0, 0);

	return Vec3i;
}());

let Vec3d = (function() {

	function Vec3d(x, y, z) {
		if(typeof x == "number"){
			this.x = x;
			this.y = y;
			this.z = z;
		} else if(typeof x == "object" && typeof x.x == "number"){
			this.x = x.x;
			this.y = x.y;
			this.z = x.z;
		} else throw new Error("illegal argument types");
		return this;
	};

	Vec3d.prototype.getComponent = function(c) {
		switch (c) {
			case 1:
				return this.getX();
			case 2:
				return this.getY();
			case 3:
				return this.getZ();
		}

		throw new Error(c + ": undefined vector components");
	};
	Vec3d.prototype.getX = function() {
		return this.x;
	};
	Vec3d.prototype.getY = function() {
		return this.y;
	};
	Vec3d.prototype.getZ = function() {
		return this.z;
	};
	Vec3d.prototype.mag = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	};
	Vec3d.prototype.getCoordinate = function(axis) {
		return axis.getCoordinate(this);
	};
	Vec3d.prototype.normalize = function() {
		var d0 = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
		return d0 < 1e-4 ? Vec3d.ZERO : new Vec3d(this.x / d0, this.y / d0, this.z / d0);
	};
	Vec3d.prototype.dotProduct = function(vec) {
		return this.x * vec.x + this.y * vec.y + this.z * vec.z;
	};
	Vec3d.prototype.subtract = function(x, y, z) {
		if (typeof x === "number") {
			return this.addVector(-x, -y, -z);
		}
		else if (typeof x === "object" && x instanceof Vec3d) {
			return this.subtract(x.x, x.y, x.z);
		}
	};
	Vec3d.prototype.add = function(x, y, z){
		if(typeof x == "object" && typeof x.x == "number")
			return new this.constructor(this.x + x.x, this.y + x.y, this.z + x.z);
		return new this.constructor(this.x + x, this.y + y, this.z + z);
	};
	Vec3d.prototype.addVector = function(){
		return this.add.apply(this, arguments);
	};
	Vec3d.copyCentered = function(toCopy){
		if(__instanceOf(toCopy, BlockPos))
			return new this(toCopy.x + .5, toCopy.y + .5, toCopy.z + .5);
	};
	Vec3d.prototype.subtractReverse = function(vec) {
		return new this.constructor(vec.x - this.x, vec.y - this.y, vec.z - this.z);
	};
	Vec3d.prototype.crossProduct = function(vec) {
		return new this.constructor(this.y * vec.z - this.z * vec.y, this.z * vec.x - this.x * vec.z, this.x * vec.y - this.y * vec.x);
	};
	Vec3d.prototype.mul = function(factorX, factorY, factorZ) {
		return new this.constructor(this.x * factorX, this.y * factorY, this.z * factorZ);
	};
	Vec3d.prototype.multiply = function(factor) {
		return new this.constructor(this.x * factor, this.y * factor, this.z * factor);
	};
	Vec3d.prototype.scale = function(scale) {
		return new this.constructor(this.x * scale, this.y * scale, this.z * scale);
	};
	Vec3d.prototype.rotatePitch = function(pitch) {
		let f = Math.cos(pitch);
		let f1 = Math.sin(pitch);
		let d0 = this.x;
		let d1 = this.y * f + this.z * f1;
		let d2 = this.z * f - this.y * f1;
		return new this.constructor(d0, d1, d2);
	};
	Vec3d.prototype.rotateYaw = function(yaw) {
		let f = Math.cos(yaw);
		let f1 = Math.sin(yaw);
		let d0 = this.x * f + this.z * f1;
		let d1 = this.y;
		let d2 = this.z * f - this.x * f1;
		return new this.constructor(d0, d1, d2);
	};
	Vec3d.fromPitchYawVector = function(vec) {
		return Vec3d.fromPitchYaw(vec.x, vec.y);
	};
	Vec3d.fromPitchYaw = function(pitch, yaw) {
		let f = Math.cos(-yaw * 0.017453292 - Math.PI);
		let f1 = Math.sin(-yaw * 0.017453292 - Math.PI);
		let f2 = Math.cos(-pitch * 0.017453292);
		let f3 = Math.sin(-pitch * 0.017453292);
		return new this.constructor(f1 * f2, f3, f * f2);
	};
	Vec3d.prototype.distanceTo = function(vec) {
		return Math.sqrt(this.squareDistanceTo(vec));
	};
	Vec3d.prototype.distanceSq = function() {
		return this.squareDistanceTo.apply(this, arguments);
	};
	Vec3d.prototype.squareDistanceTo = function(vec, y, z) {
		if (typeof vec === "object" && vec instanceof Vec3d) {
			return Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2) + Math.pow(vec.z - this.z, 2);
		}
		else
			return Math.pow(vec - this.x, 2) + Math.pow(y - this.y, 2) + Math.pow(z - this.z, 2);
	};
	Vec3d.prototype.length = function() {
		return Math.sqrt(this.lengthSquared());
	};
	Vec3d.prototype.lengthSquared = function() {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
	};
	Vec3d.prototype.getIntermediateWithXValue = function(vec, x) {
		let d0 = vec.x - this.x;
		let d1 = vec.y - this.y;
		let d2 = vec.z - this.z;
		if (d0 * d0 < Number.EPSILON) {
			return null;
		} else {
			let d3 = (x - this.x) / d0;
			return d3 >= 0.0 && d3 <= 1.0 ? new Vec3d(this.x + d0 * d3, this.y + d1 * d3, this.z + d2 * d3) : null;
		}
	};
	Vec3d.prototype.getIntermediateWithYValue = function(vec, y) {
		let d0 = vec.x - this.x;
		let d1 = vec.y - this.y;
		let d2 = vec.z - this.z;
		if (d1 * d1 < Number.EPSILON) {
			return null;
		} else {
			let d3 = (y - this.y) / d1;
			return d3 >= 0.0 && d3 <= 1.0 ? new Vec3d(this.x + d0 * d3, this.y + d1 * d3, this.z + d2 * d3) : null;
		}
	};
	Vec3d.prototype.getIntermediateWithZValue = function(vec, z) {
		let d0 = vec.x - this.x;
		let d1 = vec.y - this.y;
		let d2 = vec.z - this.z;
		if (d2 * d2 < Number.EPSILON) {
			return null;
		} else {
			let d3 = (z - this.z) / d2;
			return d3 >= 0.0 && d3 <= 1.0 ? new Vec3d(this.x + d0 * d3, this.y + d1 * d3, this.z + d2 * d3) : null;
		}
	};
	Vec3d.prototype.equals = function(obj) {
		if (this == obj)
			return true;
		else if (!(obj instanceof Vec3d))
			return false;
		else {
			var vec3d = obj;
			return java.lang.Double.compare(vec3d.x, this.x) != 0 ? false :
				(java.lang.Double.compare(vec3d.y, this.y) != 0 ? false :
					(java.lang.Double.compare(vec3d.z, this.z) == 0));
		}
	};
	Vec3d.prototype.hashCode = function() {
		var j = java.lang.Double.doubleToLongBits(this.x);
		var i = Math.floor(j ^ j >>> 32);
		j = java.lang.Double.doubleToLongBits(this.y);
		i = 31 * i + Math.floor(j ^ j >>> 32);
		j = java.lang.Double.doubleToLongBits(this.z);
		i = 31 * i + Math.floor(j ^ j >>> 32);
		return i;
	};
	Vec3d.prototype.toString = function() {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	};
	Vec3d.ZERO = new Vec3d(0, 0, 0);

	return Vec3d;
}());

let BlockPos = (function(_super) {
	__extends(BlockPos, _super);

	function BlockPos(x, y, z, relative) {
		var _this = this;
		if (typeof y !== "undefined" && typeof z !== "undefined") {
			_this = _super.call(this, x, y, z) || this;
			if (relative) _this.relative = new BlockPos(relative);
		}
		else if (typeof x === "number") {
			var pos = Entity.getPosition(x);
			return new BlockPos(pos.x, pos.y, pos.z);
		}
		else if (typeof x === "object") {
			if (x instanceof Vec3d) {
				return new BlockPos(x.x, x.y, x.z);
			}
			else if (x instanceof Vec3i) {
				if (x instanceof BlockPos)
					return new BlockPos(x.getX(), x.getY(), x.getZ(), x.relative);
				return new BlockPos(x.getX(), x.getY(), x.getZ());
			}

			return new BlockPos(x.x, x.y, x.z, x.relative);
		}
		return _this;
	};

	BlockPos.prototype.add = function(x, y, z) {
		if (typeof x === "number") {
			return (x == 0 && y == 0 && z == 0) ? this : new BlockPos(this.getX() + x, this.getY() + y, this.getZ() + z);
		}
		else
			return x.getX() == 0 && x.getY() == 0 && x.getZ() == 0 ? this : new BlockPos(this.getX() + x.getX(), this.getY() + x.getY(), this.getZ() + x.getZ());
	};
	BlockPos.prototype.subtract = function(vec) {
		return vec.getX() == 0 && vec.getY() == 0 && vec.getZ() == 0 ? this : new BlockPos(this.getX() - vec.getX(), this.getY() - vec.getY(), this.getZ() - vec.getZ());
	};
	BlockPos.prototype.rotate = function(rotationIn) {
		switch (rotationIn) {
			case Rotation.NONE:
			default:
				return this;
			case Rotation.CLOCKWISE_90:
				return new BlockPos(-this.getZ(), this.getY(), this.getX());
			case Rotation.CLOCKWISE_180:
				return new BlockPos(-this.getX(), this.getY(), -this.getZ());
			case Rotation.COUNTERCLOCKWISE_90:
				return new BlockPos(this.getZ(), this.getY(), -this.getX());
		}
	};
	BlockPos.prototype.up = function(n) {
		if (typeof n !== "undefined") {
			return this.offset(Direction.UP, n);
		}
		else
			return this.up(1);
	};
	BlockPos.prototype.down = function(n) {
		if (typeof n !== "undefined") {
			return this.offset(Direction.DOWN, n);
		}
		else
			return this.down(1);
	};
	BlockPos.prototype.north = function(n) {
		if (typeof n !== "undefined") {
			return this.offset(Direction.NORTH, n);
		}
		else
			return this.north(1);
	};
	BlockPos.prototype.south = function(n) {
		if (typeof n !== "undefined") {
			return this.offset(Direction.SOUTH, n);
		}
		else
			return this.south(1);
	};
	BlockPos.prototype.west = function(n) {
		if (typeof n !== "undefined") {
			return this.offset(Direction.WEST, n);
		}
		else
			return this.west(1);
	};
	BlockPos.prototype.east = function(n) {
		if (typeof n !== "undefined") {
			return this.offset(Direction.EAST, n);
		}
		else
			return this.east(1);
	};
	BlockPos.prototype.offset = function(facing, n) {
		if (typeof n !== "undefined") {
			return n == 0 ? this : new BlockPos(this.getX() + facing.getXOffset() * n, this.getY() + facing.getYOffset() * n, this.getZ() + facing.getZOffset() * n);
		}
		else
			return this.offset(facing, 1);
	};
	BlockPos.prototype.crossProduct = function(vec) {
		return new BlockPos(this.getY() * vec.getZ() - this.getZ() * vec.getY(), this.getZ() * vec.getX() - this.getX() * vec.getZ(), this.getX() * vec.getY() - this.getY() * vec.getX());
	};
	BlockPos.prototype.toLong = function() {
		return (this.getX() & BlockPos.X_MASK) << BlockPos.X_SHIFT |
			(this.getY() & BlockPos.Y_MASK) << BlockPos.Y_SHIFT |
			(this.getZ() & BlockPos.Z_MASK) << 0;
	};
	BlockPos.prototype.fromLong = function(serialized) {
		return new BlockPos(serialized << 64 - BlockPos.X_SHIFT - BlockPos.NUM_X_BITS >> 64 - BlockPos.NUM_X_BITS, serialized << 64 - BlockPos.Y_SHIFT - BlockPos.NUM_Y_BITS >> 64 - BlockPos.NUM_Y_BITS, serialized << 64 - BlockPos.NUM_Z_BITS >> 64 - BlockPos.NUM_Z_BITS);
	};
	BlockPos.getAllInBox = function(from, to) {
		const poss = [];
		const p1 = new BlockPos(Math.min(from.getX(), to.getX()), Math.min(from.getY(), to.getY()), Math.min(from.getZ(), to.getZ()));
		const p2 = new BlockPos(Math.max(from.getX(), to.getX()), Math.max(from.getY(), to.getY()), Math.max(from.getZ(), to.getZ()));
		for (let xx = p1.getX(); xx <= p2.getX(); xx++)
			for (let yy = p1.getY(); yy <= p2.getY(); yy++)
				for (let zz = p1.getZ(); zz <= p2.getZ(); zz++)
					poss.push(new BlockPos(xx, yy, zz));
		return poss;
	};
	BlockPos.ORIGIN = new BlockPos(0, 0, 0);
	BlockPos.NUM_X_BITS = 1 + Math.log2(MathHelper.smallestEncompassingPowerOfTwo(30000000)); //TODO
	BlockPos.NUM_Z_BITS = BlockPos.NUM_X_BITS;
	BlockPos.NUM_Y_BITS = 64 - BlockPos.NUM_X_BITS - BlockPos.NUM_Z_BITS;
	BlockPos.Y_SHIFT = 0 + BlockPos.NUM_Z_BITS;
	BlockPos.X_SHIFT = BlockPos.Y_SHIFT + BlockPos.NUM_Y_BITS;
	BlockPos.X_MASK = (1 << BlockPos.NUM_X_BITS) - 1;
	BlockPos.Y_MASK = (1 << BlockPos.NUM_Y_BITS) - 1;
	BlockPos.Z_MASK = (1 << BlockPos.NUM_Z_BITS) - 1;

	return BlockPos;
}(Vec3i));

let Direction = (function() {
	let AxisDirection = (function() {

		function AxisDirection(offset, description) {
			this.offset = offset;
			this.description = description
			return this;
		};

		AxisDirection.prototype.getOffset = function() {
			return this.offset;
		};
		AxisDirection.prototype.toString = function() {
			return this.description;
		};
		AxisDirection.prototype.inverted = function() {
			return this == POSITIVE ? NEGATIVE : POSITIVE;
		};
		const POSITIVE = new AxisDirection(1, "Towards positive");
		const NEGATIVE = new AxisDirection(-1, "Towards negative");
		AxisDirection.POSITIVE = POSITIVE;
		AxisDirection.NEGATIVE = NEGATIVE;

		return AxisDirection;
	}());
	Direction.AxisDirection = AxisDirection;
	let Axis = (function() {

		function Axis(name) {
			this.name = name;
			return this;
		};

		function values() {
			return [X, Y, Z];
		};
		Axis.values = values;

		function byName(name) {
			switch (name.toLowerCase()) {
				case "x":
					return X;
				case "y":
					return Y;
				case "z":
					return Z;
			}
		};
		Axis.byName = byName;
		Axis.prototype.getName2 = function() {
			return this.name;
		};
		Axis.prototype.isVertical = function() {
			return this == Y;
		};
		Axis.prototype.isHorizontal = function() {
			return this == X || this == Z;
		};
		Axis.prototype.toString = function() {
			return this.name;
		};

		function getRandomAxis(rand) {
			return VALUES[rand.nextInt(VALUES.length - 1)];
		};
		Axis.getRandomAxis = getRandomAxis;
		Axis.prototype.getPlane = function() {
			switch (this) {
				case X:
				case Y:
					return Plane.HORIZONTAL;
				case Z:
					return Plane.VERTICAL;
			}
		};
		Axis.prototype.getString = function() {
			return this.name;
		};
		Axis.prototype.getCoordinate = function(x, y, z) {
			switch (this) {
				case X:
					return x;
				case Y:
					return y;
				case Z:
					return z;
			}
		};
		const X = new Axis("x");
		const Y = new Axis("y");
		const Z = new Axis("z");
		const VALUES = values();
		Axis.X = X;
		Axis.Y = Y;
		Axis.Z = Z;
		Axis.VALUES = VALUES;

		return Axis;
	}());
	Direction.Axis = Axis;

	function Direction(indexIn, oppositeIn, horizontalIndexIn, nameIn, axisDirectionIn, axisIn, directionVecIn) {
		this.index = indexIn;
		this.horizontalIndex = horizontalIndexIn;
		this.opposite = oppositeIn;
		this.name = nameIn;
		this.axis = axisIn;
		this.axisDirection = axisDirectionIn;
		this.directionVec = directionVecIn;
	};

	function values() {
		return [DOWN, UP, NORTH, SOUTH, WEST, EAST];
	};
	Direction.values = values;

	function compose(first, second, third) {
		return [first, second, third, third.getOpposite(), second.getOpposite(), first.getOpposite()];
	};
	Direction.compose = compose;
	Direction.prototype.getIndex = function() {
		return this.index;
	};
	Direction.prototype.getHorizontalIndex = function() {
		return this.horizontalIndex;
	};
	Direction.prototype.getAxisDirection = function() {
		return this.axisDirection;
	};
	Direction.prototype.getOpposite = function() {
		return VALUES[this.opposite];
	};
	Direction.prototype.rotateY = function() {
		switch (this) {
			case NORTH:
				return EAST;
			case SOUTH:
				return WEST;
			case WEST:
				return NORTH;
			case EAST:
				return SOUTH;
		}
	};
	Direction.prototype.rotateYCCW = function() {
		switch (this) {
			case NORTH:
				return WEST;
			case SOUTH:
				return EAST;
			case WEST:
				return SOUTH;
			case EAST:
				return NORTH;
		}
	};
	Direction.prototype.getXOffset = function() {
		return this.directionVec.getX();
	};
	Direction.prototype.getYOffset = function() {
		return this.directionVec.getY();
	};
	Direction.prototype.getZOffset = function() {
		return this.directionVec.getZ();
	};
	Direction.prototype.toVec3d = function() {
		return new Vec3d(this.getXOffset(), this.getYOffset(), this.getZOffset());
	};
	Direction.prototype.getName2 = function() {
		return this.name;
	};
	Direction.prototype.getAxis = function() {
		return this.axis;
	};

	function getFacingFromAxisDirection(axisIn, axisDirectionIn) {
		switch (axisIn) {
			case X:
				return axisDirectionIn == Direction.AxisDirection.POSITIVE ? EAST : WEST;
			case Y:
				return axisDirectionIn == Direction.AxisDirection.POSITIVE ? UP : DOWN;
			case Z:
			default:
				return axisDirectionIn == Direction.AxisDirection.POSITIVE ? SOUTH : NORTH;
		}
	};
	Direction.getFacingFromAxisDirection = getFacingFromAxisDirection;
	Direction.prototype.getHorizontalAngleb = function() {
		return (this.horizontalIndex & 3) * 90;
	};

	function getRandomDirection(rand) {
		return VALUES[rand.nextInt(VALUES.length - 1)];
	};
	Direction.getRandomDirection = getRandomDirection;

	function getFacingFromVector(x, y, z) {
		let direction = NORTH;
		let f = java.lang.Float.MIN_VALUE;
		for (let i in VALUES) {
			let direction1 = VALUES[i];
			let f1 = x * direction1.directionVec.getX() + y * direction1.directionVec.getY() + z * direction1.directionVec.getZ();
			if (f1 > f) {
				f = f1;
				direction = direction1;
			}
		}
		return direction;
	};
	Direction.getFacingFromVector = getFacingFromVector;
	Direction.prototype.toString = function() {
		return this.name;
	};
	Direction.prototype.getString = function() {
		return this.name;
	};

	function getFacingFromAxis(axisDirectionIn, axisIn) {
		for (let i in VALUES) {
			let direction = VALUES[i];
			if (direction.getAxisDirection() == axisDirectionIn && direction.getAxis() == axisIn) {
				return direction;
			}
		}
	};
	Direction.getFacingFromAxis = getFacingFromAxis;
	Direction.prototype.getDirectionVec = function() {
		return this.directionVec;
	};
	const DOWN = new Direction(0, 1, -1, "down", AxisDirection.NEGATIVE, Axis.Y, new Vec3i(0, -1, 0));
	const UP = new Direction(1, 0, -1, "up", AxisDirection.POSITIVE, Axis.Y, new Vec3i(0, 1, 0));
	const NORTH = new Direction(2, 3, 2, "north", AxisDirection.NEGATIVE, Axis.Z, new Vec3i(0, 0, -1));
	const SOUTH = new Direction(3, 2, 0, "south", AxisDirection.POSITIVE, Axis.Z, new Vec3i(0, 0, 1));
	const WEST = new Direction(4, 5, 1, "west", AxisDirection.NEGATIVE, Axis.X, new Vec3i(-1, 0, 0));
	const EAST = new Direction(5, 4, 3, "east", AxisDirection.POSITIVE, Axis.X, new Vec3i(1, 0, 0));
	const VALUES = values();
	Direction.DOWN = DOWN;
	Direction.UP = UP;
	Direction.NORTH = NORTH;
	Direction.SOUTH = SOUTH;
	Direction.WEST = WEST;
	Direction.EAST = EAST;
	Direction.VALUES = VALUES;
	let Plane = (function() {
		function Plane(facingValuesIn /*, axisValuesIn*/ ) {
			this.facingValues = facingValuesIn;
			//this.axisValues = axisValuesIn;
			return this;
		};
		Plane.prototype.random = function(rand) {
			return this.facingValues[rand.nextInt(this.facingValues.length - 1)];
		};
		const HORIZONTAL = [NORTH, EAST, SOUTH, WEST];
		const VERTICAL = [UP, DOWN];
		Plane.HORIZONTAL = HORIZONTAL;
		Plane.VERTICAL = VERTICAL;
		return Plane;
	}());
	Direction.Plane = Plane;

	return Direction;
}());

let LevelDisplayedQueue = {
	actions: [],
	isDisplayed: false,
	run: function(action, thisArg) {
		if (this.isDisplayed) action.apply(thisArg || this, []);
		else this.actions.push([action, thisArg]);
	}
};

Callback.addCallback("LevelDisplayed", function() {
	let actions = LevelDisplayedQueue.actions;
	LevelDisplayedQueue.isDisplayed = true;
	while (actions.length > 0) {
		let action = actions.shift();
		action[0].apply(action[1] || {}, []);
	}
});

Callback.addCallback("LevelLeft", function() {
	LevelDisplayedQueue.isDisplayed = false;
});

let ParticleType = (function() {

	const CACHE = ParticleType.CACHE = {};

	function ParticleType(particleData) {
		let key = JSON.stringify(particleData);
		let id;
		if (CACHE[key]) {
			id = CACHE[key];
		} else {
			let _id = Particles.registerParticleType(particleData);
			CACHE[key] = _id;
			id = _id;
		}
		this.id = id;
		this.particleType = Particles.getParticleTypeById(this.id);
		return this;
	};

	ParticleType.prototype.getId = function() {
		return this.id;
	};
	ParticleType.prototype.setAnimator = function(name, animator) {
		this.particleType.setAnimator(name, animator);
		return this;
	};
	ParticleType.prototype.setCollisionParams = function(collision, keepVelocityAfterImpact, addLifetimeAfterImpact) {
		this.particleType.setCollisionParams(collision, keepVelocityAfterImpact, addLifetimeAfterImpact);
		return this;
	};
	ParticleType.prototype.setColor = function(r, g, b, a, r2, g2, b2, a2) {
		this.particleType.setColor(r, g, b, a, r2 || 0, g2 || 0, b2 || 0, a2 || 1);
		return this;
	};
	ParticleType.prototype.setDefaultAcceleration = function(x, y, z) {
		this.particleType.setDefaultAcceleration(x, y, z);
		return this;
	};
	ParticleType.prototype.setDefaultVelocity = function(x, y, z) {
		this.particleType.setDefaultVelocity(x, y, z);
		return this;
	};
	ParticleType.prototype.setFriction = function(air, block) {
		this.particleType.setFriction(air, block);
		return this;
	};
	ParticleType.prototype.setLifetime = function(min, max) {
		this.particleType.setLifetime(min, max);
		return this;
	};
	ParticleType.prototype.setRebuildDelay = function(delay) {
		this.particleType.setRebuildDelay(delay);
		return this;
	};
	ParticleType.prototype.setRenderType = function(type) {
		this.particleType.setRenderType(type);
		return this;
	};
	ParticleType.prototype.setSize = function(min, max) {
		this.particleType.setSize(min, max);
		return this;
	};
	ParticleType.prototype.setSubEmitter = function(type, emitter) {
		this.particleType.setSubEmitter(type, emitter);
		return this;
	};

	return ParticleType;
}());

let ParticleEmitter = (function() {

	let TickableEmitters = ParticleEmitter.TickableEmitters = [];

	Callback.addCallback("LocalTick", function() {
		for (let i in TickableEmitters) {
			TickableEmitters[i].tick();
		}
	});

	function ParticleEmitter(x, y, z) {
		this.emitter = new Particles.ParticleEmitter(x, y, z);
		TickableEmitters.push(this);
		return this;
	};

	ParticleEmitter.prototype.move = function(x, y, z) {
		x = x || 0;
		y = y || 0;
		z = z || 0;
		this.emitter.move(x, y, z);
	};
	ParticleEmitter.prototype.setVelocity = function(x, y, z) {
		x = x || 0;
		y = y || 0;
		z = z || 0;
		this.emitter.setVelocity(x, y, z);
	};
	ParticleEmitter.prototype.emit = function(id, data, x, y, z, vx, vy, vz, ax, ay, az) {
		vx = vx || 0;
		vy = vy || 0;
		vz = vz || 0;
		ax = ax || 0;
		ay = ay || 0;
		az = az || 0;
		this.emitter.emit(id, data, x, y, z, vx, vy, vz, ax, ay, az);
	};
	ParticleEmitter.prototype.tick = function() {};
	ParticleEmitter.prototype.remove = function() {
		let index = TickableEmitters.indexOf(this);
		TickableEmitters.splice(index, index != -1);
		this.emitter.release();
		this.emitter = null;
		this.isRemoved = true;
	};

	return ParticleEmitter;
}());

let ParticleManager = (function(ParticleManager){

	let ParticleEffects = ParticleManager.ParticleEffects = {};

	function registerParticleEffect(name, func){
		Network.addClientPacket("SUGAr-client.particle_effect." + name, function(packet){
			func(packet, false);
		});
		ParticleEffects[name] = func;
	};
	ParticleManager.registerParticleEffect = registerParticleEffect;

	function particleEffect(name, dimension, packet){
		if (!LevelDisplayedQueue.isDisplayed) return;
		if (Network.inRemoteWorld()) {
			ParticleEffects[name](packet, true);
		} else {
			let players = Network.getConnectedPlayers();
			for (let i in players) {
				let player = players[i];
				if (Entity.getDimension(player) != dimension) return;
				let pos = new Vec3d(Entity.getPosition(player));
				if (pos.distanceSq(packet) > 30) return;
				let client = Network.getClientForPlayer(player);
				if (client) {
					client.send("SUGAr-client.particle_effect." + name, packet);
				}
			}
		}
	};
	ParticleManager.particleEffect = particleEffect;

	function addParticle(dimension, type, x, y, z, vx, vy, vz){
		particleEffect("single_particle", dimension, {type: __instanceOf(type, ParticleType) ? type.getId() : type, x: x, y: y, z: z, vx: vx, vy: vy, vz: vz});
	};
	ParticleManager.addParticle = addParticle;

	(function initVanillaParticleEffects(){
		registerParticleEffect("grow_pant", function(packet){
			for (let i = 0; i < 16; i++) {
				let px = packet.x + Math.random();
				let pz = packet.z + Math.random();
				let py = packet.y + Math.random();
				Particles.addParticle(37, px, py, pz, 0, 0, 0);
			}
		});
		registerParticleEffect("single_particle", function(packet){
			Particles.addParticle(packet.type, packet.x, packet.y, packet.z, packet.vx || 0, packet.vy || 0, packet.vz || 0);
		});
	}());

	return ParticleManager;
}({}))

let AbstractBlockState = (function() { 
	function AbstractBlockState(id, data) {
		if (id.class == com.zhekasmirnov.apparatus.adapter.innercore.game.block.BlockState) {
			this.id = id.id;
			this.data = id.data;
			this.state = id;
		} else if (typeof id == "number") {
			this.id = id;
		} else if (typeof id == "object") {
			for (let i in id) {
				this[i] = id[i];
			}
		} else if (typeof id == "string") {
			this.id = VanillaBlockID[id] || BlockID[id];
		}

		this.data = data || this.data || 0;

		if (this.id) this.block = _BlockRegistry.getInstanceOf(this.id);
	};

	AbstractBlockState.prototype.getBlock = function() {
		return this.block;
	};
	AbstractBlockState.prototype.isAir = function() {
		return this.id == 0;
	};

	return AbstractBlockState;
}());

let DyeColor = (function(){

	const ITEM_BY_COLOR = DyeColor.ITEM_BY_COLOR = {};
	const COLOR_BY_ITEM = DyeColor.COLOR_BY_ITEM = {};

	__enum(DyeColor, "white", 0, 16383998);
	__enum(DyeColor, "orange", 1, 16351261);
	__enum(DyeColor, "magenta", 2, 13061821);
	__enum(DyeColor, "light_blue", 3, 3847130);
	__enum(DyeColor, "yellow", 4, 16701501);
	__enum(DyeColor, "lime", 5, 8439583);
	__enum(DyeColor, "pink", 6, 15961002);
	__enum(DyeColor, "gray", 7, 4673362);
	__enum(DyeColor, "light_gray", 8, 10329495);
	__enum(DyeColor, "cyan", 9, 1481884);
	__enum(DyeColor, "purple", 10, 8991416);
	__enum(DyeColor, "blue", 11, 3949738);
	__enum(DyeColor, "brown", 12, 8606770);
	__enum(DyeColor, "green", 13, 6192150);
	__enum(DyeColor, "red", 14, 11546150);
	__enum(DyeColor, "black", 15, 1908001);

	function DyeColor(id, colorValue){
		this.id = id;
		this.translationKey = this.name().toLowerCase();
		this.colorValue = colorValue;
		let i = (colorValue & 16711680) >> 16;
		let j = (colorValue & 65280) >> 8;
		let k = (colorValue & 255) >> 0;
		this.colorComponentValues = [i / 255, j / 255, k / 255];
	};

	DyeColor.prototype.getId = function(){
		return this.id;
	};
	DyeColor.prototype.getTranslationKey = function(){
		return this.translationKey;
	};
	DyeColor.prototype.getColorValue = function(){
		return this.colorValue;
	};
	DyeColor.prototype.getColorComponentValues = function(){
		return this.colorComponentValues;
	};
	DyeColor.prototype.toString = function(){
		return this.translationKey;
	};
	DyeColor.byId = function(colorID){
		if(colorID < 0 || colorID >= DyeColor.values().length)
			colorID = 0;
		return DyeColor.values()[colorID];
	};
	DyeColor.byTranslationKey = function(translationKey, fallback){
		for(let i in DyeColor.values())
			if(DyeColor.values()[i].translationKey == translationKey)
				return DyeColor.values()[i];
		return fallback;
	};

	for(let i in DyeColor.values()){
		dyeColor = DyeColor.values()[i];
		let dyeItem = IDConverter.getStack(dyeColor.getTranslationKey() + "_dye");
		ITEM_BY_COLOR[dyeColor] = dyeItem.id;
		COLOR_BY_ITEM[dyeItem.id] = dyeColor;
	}

	return DyeColor;
}());

let ModelBiped = (function(){

	function ModelBiped(templateName){
		this.templateName = templateName;
		this._render = new ActorRenderer(templateName);
		this._head = new ModelRenderer("head");
		this._body = new ModelRenderer("body");
		this._rightArm = new ModelRenderer("rightArm");
		this._leftArm = new ModelRenderer("leftArm");
		this._rightLeg = new ModelRenderer("rightLeg");
		this._leftLeg = new ModelRenderer("leftLeg");
		return this;
	};

	ModelBiped.prototype.end = function(){
		switch(this.templateName){
			case "helmet":
				initParts([this._head]);
				break;
			case "chestplate":
				initParts([this._body, this._rightArm, this._leftArm]);
				break;
			case "leggings":
				initParts([this._leftLeg, this._rightLeg]);
				break;
			case "boots":
				initParts([this._leftLeg, this._rightLeg]);
				break;
		}
	};

	function initParts(partsArr, parentName){
		for(let i in partsArr){
			let part = partsArr[i];
			if (parentName) {
				let vPart = part.baseModel._render.addPart(part._partName, parentName);
				for (let j in part.boxes) {
					let box = part.boxes[j];
					vPart.addBox(box[0], box[1], box[2], box[3], box[4], box[5], box[6], box[7], box[8]);
				};
				vPart.setPivot(part.pivotX, part.pivotY, part.pivotZ)
					.setRotation(part.rotationX, part.rotationY, part.rotationZ)
					.setTextureSize(part.textureWidth, part.textureHeight)
					.setMirrored(part.mirrored)
				.endPart();
			}

			if(part.childs) initParts(part.childs, part._partName);
		}
	};

	return ModelBiped;
}());

let ModelRenderer = (function(){

	function ModelRenderer(model, offsetX, offsetY){
		this.childs = [];
		if(typeof model == "string"){
			this._partName = model;
			return this;
		};
		this._partName = randKey();
		this.boxes = [];
		this.baseModel = model;
		this.setRotationPoint(0, 0, 0);
		this.setRotation(0, 0, 0);
		this.setMirrored(false);
		this.setTextureSize(model.textureWidth, model.textureHeight);
		this.setTextureOffset(offsetX, offsetY);
		return this;
	};

	ModelRenderer.prototype.setTextureOffset = function(offsetX, offsetY){
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		return this;
	};
	ModelRenderer.prototype.addBox = function(offX, offY, offZ, width, height, depth, inflate, u, v){
		this.boxes.push([offX, offY, offZ, width, height, depth, 1 || inflate, u || this.offsetX, v || this.offsetY]);
		return this;
	};
	ModelRenderer.prototype.setRotationPoint = function(x, y, z){
		this.pivotX = x;
		this.pivotY = y;
		this.pivotZ = z;
		return this;
	};
	ModelRenderer.prototype.setRotation = function(x, y, z){
		this.rotationX = x;
		this.rotationY = y;
		this.rotationZ = z;
		return this;
	};
    ModelRenderer.prototype.setTextureSize = function(textureWidthIn, textureHeightIn){
		this.textureWidth = textureWidthIn;
		this.textureHeight = textureHeightIn;
		return this;
	};
	ModelRenderer.prototype.setMirrored = function(bool){
		this.mirrored = bool;
		return this;
	};
	ModelRenderer.prototype.end = function(){
		return this.baseModel;
	};
	ModelRenderer.prototype.addChild = function(part){
		this.childs.push(part);
	};

	return ModelRenderer;
}());


let EStackLinkType = (function(){

	__enum(EStackLinkType, "armor_slot");
	__enum(EStackLinkType, "inventory_slot");
	__enum(EStackLinkType, "offhand_item");
	__enum(EStackLinkType, "carried_item");
	__enum(EStackLinkType, "dropped_item");
	//TODO __enum(EStackLinkType, "container_slot");

	function EStackLinkType(){
		return this;
	};

	return EStackLinkType;
}());

Callback.addCallback("ChangeCarriedItem", function(player, oldItem, newItem, hand){
	let clazz = ItemRegistry.getInstanceOf(newItem.id);
	oldItem = new ItemStack(Number(oldItem.id), Number(oldItem.count), Number(oldItem.data), oldItem.extra);
	newItem = new ItemStack(Number(newItem.id), Number(newItem.count), Number(newItem.data), newItem.extra);
	if(clazz && clazz.onCarried) clazz.onCarried(player, oldItem, newItem, hand);
});

let _ItemStack = (function(_super) {
	__extends(_ItemStack, _super);

	const CUSTOM_LINKS = {};

	function _ItemStack(item, count, data, extra) {
		if (typeof item == "object") {
			this.id = item.id;
			this.data = item.data || 0;
			this.count = item.count || 1
			this.extra = item.extra || null;
			this._linkedObject = item;
		}
		else if(typeof item == "number"){
			this.id = item;
			this.data = data || 0;
			this.count = count || 1;
			this.extra = extra || null;
		}
		if(!this.id) this.clear();
	};

	_ItemStack.prototype.clear = function(){
		_super.prototype.clear.call(this);
		this._synchronize();
	};
	_ItemStack.prototype.getId = function() {
		return this.id;
	};
	_ItemStack.prototype.getItemInstance = function() {
		return this.getItem();
	};
	_ItemStack.prototype.getCount = function() {
		return this.count;
	};
	_ItemStack.prototype.getData = function() {
		return this.data;
	};
	_ItemStack.prototype.getDamage = function(){
		return this.getData();
	};
	_ItemStack.prototype.getAllEnchantNames = function(){
		if(this.extra)
			return this.extra.getAllEnchantNames();
		return "";
	};
	_ItemStack.prototype.getEnchantCount = function(){
		if(this.extra)
			return this.extra.getEnchantCount();
		return 0;
	};
	_ItemStack.prototype.getEnchants = function(){
		if(this.extra)
			return this.extra.getEnchants();
		return {};
	};
	_ItemStack.prototype.isEnchanted = function(){
		if(this.extra)
			return this.extra.isEnchanted();
		return false;
	}
	_ItemStack.prototype.getEnchantLevel = function(type){
		if(this.extra)
			return this.extra.getEnchantLevel(type);
		return 0;
	};
	_ItemStack.prototype.removeAllEnchants = function(){
		if(this.extra)
			this.extra.removeAllEnchants();
	};
	_ItemStack.prototype.removeEnchant = function(type){
		if(this.extra)
			this.extra.removeEnchant(type);
	};
	_ItemStack.prototype.setDamage = function(damage){
		this.setData(damage);
	};
	_ItemStack.prototype.getExtra = function() {
		return this.extra || null;
	};
	_ItemStack.prototype.getModel = function(){
		return ItemModel.getFor(this.getId(), this.getData());
	};
	_ItemStack.prototype.decrease = function(count) {
		_super.prototype.decrease.call(this, count || 1);
		this._synchronize();
	};
	_ItemStack.prototype.linkObject = function(obj) {
		this._linkedObject = obj;
	};
	_ItemStack.prototype.link = function(linkType, entity, slot){
		this._linkType = linkType;
		this._linkedEntity = entity;
		this._linkedSlot = slot;
	};
	_ItemStack.prototype.unlink = function(bool){
		this._linkType = null;
		this._linkedEntity = null;
		this._linkedSlot = null;
		if(!bool) this._linkedObject = null;
	}
	_ItemStack.registerLink = function(linkType, linkFunc){
		CUSTOM_LINKS[linkType] = linkFunc;
	};
	_ItemStack.prototype.copy = function() {
		return new _ItemStack(this.id, this.count, this.data, this.extra ? this.extra.copy() : null);
	};
	_ItemStack.prototype.equals = function (stack, checkExtra){
		return this.id == stack.id &&
		this.count == stack.count &&
		this.data == stack.data &&
		(!checkExtra || (this.extra == stack.extra) ||
		this.extra.toString() == stack.extra.toString());
	};
	_ItemStack.prototype._synchronize = function() {
		switch(this._linkType){
			case EStackLinkType.ARMOR_SLOT:
				this._linkedEntity.setArmorSlot(this._linkedSlot, this);
				break;
			case EStackLinkType.INVENTORY_SLOT:
				this._linkedEntity.setInventorySlot(this._linkedSlot, this);
				break;
			case EStackLinkType.CARRIED_ITEM:
				this._linkedEntity.setCarriedItem(this);
				break;
			case EStackLinkType.OFFHAND_ITEM:
				this._linkedEntity.setOffhandItem(this);
				break;
			case EStackLinkType.DROPPED_ITEM:
				this._linkedEntity.setItemStack(this);
				break;
			default:
				if(__instanceOf(this._linkType, EStackLinkType)){
					let linkFunc = this._customLinks[this.linkType];
					let args = [].slice.call(arguments);
					args.shift();
					if(linkFunc) linkFunc.apply(this, args);
				};
		};

		if (this._linkedObject) {
			this._linkedObject.id = this.getId();
			this._linkedObject.count = this.getCount();
			this._linkedObject.data = this.getData();
			this._linkedObject.extra = this.getExtra();
		}
	};
	_ItemStack.prototype.getItem = function() {
		return _ItemRegistry.getInstanceOf(this.id);
	};
	_ItemStack.prototype.setId = function(id) {
		this.id = id;
		this._synchronize();
	};
	_ItemStack.prototype.setCount = function(count) {
		this.count = count;
		if(this.count <= 0) this.clear();
		this._synchronize();
	};
	_ItemStack.prototype.setData = function(data) {
		this.data = data;
		this._synchronize();
	};
	_ItemStack.prototype.setExtra = function(extra) {
		this.extra = extra;
		this._synchronize();
	};
	_ItemStack.prototype.set = function(id, count, data, extra){
		this.id = (id === null || id === undefined) ? this.id : id;
		this.count = (count === null || count === undefined) ? this.count : count;
		this.data = (data === null || data === undefined) ? this.data : data;
		this.extra = (extra === null || extra === undefined) ? this.extra : extra;
		this._synchronize();
	};

	return _ItemStack;
}(ItemStack));

let _BlockBase = (function(_super) {
	__extends(_BlockBase, _super);

	const SHAPE = new AxisAlignedBB(0, 0, 0, 1, 1, 1);

	function _BlockBase() {
		_super.apply(this, arguments);
		this.textureName = "";
		for (let i = 0; i < this.stringID.length; i++) this.textureName += this.stringID[i].toLowerCase() != this.stringID[i].toUpperCase() && this.stringID[i] == this.stringID[i].toUpperCase() ? "_" + this.stringID[i].toLowerCase() : this.stringID[i];
		this.setShape.apply(this, this.getShape().toArray());
		return this;
	};
	_BlockBase.prototype.getShape = function() {
		return SHAPE;
	};
	_BlockBase.prototype.createBlock = function(){
		if(this.variations.length == 0){
			this.addVariation(this.name || this.stringID, [[this.textureName, 0]], true);
		};
		_super.prototype.createBlock.call(this);
	};
	_BlockBase.prototype.getOffset = function(coords) {
		return new Vec3d(Vec3d.ZERO);
	};
	_BlockBase.prototype.canPlace = function(coords, block, region) {
		if (World.canTileBeReplaced(block.id, block.data)) {
			return coords;
		}

		if (coords.relative) {
			coords = coords.relative;
			let block1 = region.getBlock(coords);
			if (World.canTileBeReplaced(block1.id, block1.data)) {
				return coords;
			}
		}
	};
	_BlockBase.prototype.placeAt = function(region, coords, data) {
		coords = this.canPlace(coords, region.getBlock(coords), region);
		if (coords) {
			region.setBlock(coords, this.id, data || 0);
			return true;
		}

		return false;
	};
	_BlockBase.prototype.onPlace = function(coords, item, block, player, region) {
		coords = this.canPlace(coords, block, region);
		if (coords) region.setBlock(coords, this.id, item.data);
		else item.decrease(1);
	};
	_BlockBase.prototype.onBreak = function (coords, block, region) {
		if (Math.random() >= 0.25)
			return;
		var enchant = ToolAPI.getEnchantExtraData();
		var item = new ItemStack();
		var drop = this.getDrop(coords, block, 127, enchant, item, region);
		for (var _i = 0, drop_2 = drop; _i < drop_2.length; _i++) {
			var item_2 = drop_2[_i];
			region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, item_2[0], item_2[1], item_2[2], item_2[3] || null);
		}
	};

	return _BlockBase;
}(BlockBase));

let IGrowable = new Interface();

Callback.addCallback("ItemUse", function (coords, item, state,_, player){
	coords = new BlockPos(coords);
	state = new AbstractBlockState(state);
	let block = state.getBlock();
	let region = _WorldRegion.getForActor(player);
	if(__instanceOf(block, IGrowable) && item.id == 858) if(block.canUseBonemeal(region, coords, state)){
		if(block.canGrow(region, coords, state)){
			ParticleManager.particleEffect("grow_plant", region, {x: coords.x, y: coords.y, z: coords.z});
			block.grow(region, coords, state.data);
		}

		Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
	}
});


let BushBlock = (function(_super) {
	__extends(BushBlock, _super);

	const SHAPE = new AxisAlignedBB(0.3, 0, 0.3, 0.7, 1, 0.7);

	function BushBlock(nameID) {
		_super.call(this, nameID);
		this.setBaseBlock(38);
		this.setSolid(false);
		this.setDestroyTime(0);
		this.setRenderAllFaces(true);
		this.setBlockMaterial("plant");
		this.setSoundType("grass");
		this.setRenderType(1);
		this.setCategory(ItemCategory.NATURE);
		this.PLACEABLE_TILES = [2, 3, 60, 110, 243];
		let shape = new ICRender.CollisionShape();
		shape.addEntry().addBox(1, 1, 1, 0, 0, 0);
		BlockRenderer.setCustomCollisionShape(this.id, -1, shape);
		return this;
	};

	BushBlock.prototype.isValidGround = function(block) {
		return this.PLACEABLE_TILES.indexOf(block.id) != -1;
	};
	BushBlock.prototype.isValidPosition = function(region, pos) {
		return this.isValidGround(region.getBlock(pos.down()));
	};
	BushBlock.prototype.onNeighbourChange = function(pos, block, changeCoords, region) {
		if (changeCoords.y < pos.y && !this.isValidPosition(region, pos)) {
			region.destroyBlock(pos, true);
		}
	};
	BushBlock.prototype.onRandomTick = function(pos, block, region) {
		if (!this.isValidPosition(region, pos)) {
			region.destroyBlock(pos, true);
		}
	};
	BushBlock.prototype.canPlace = function(pos, block, region) {
		pos = _super.prototype.canPlace.call(this, pos, block, region);
		if (pos && this.isValidPosition(region, pos)) {
			return pos;
		}
	};
	BushBlock.prototype.getShape = function() {
		return SHAPE;
	};

	return BushBlock;
}(_BlockBase));

let Actor = (function (){

	function Actor(uuid){
		if(!uuid) throw new Error("illegal uuid argument");
		this.uuid = uuid;
		this.__type = Entity.getType(uuid);
		this.region = _WorldRegion.getForActor(uuid);
		return this;
	};

	Actor.prototype.setUid = function(uuid){
		Actor.call(this, uuid);
	};
	Actor.prototype.getUid = function (){
		return this.uuid;
	};
	Actor.prototype.addEffect = function(effectID, effectData, effectTime, ambience, particles){
		Entity.addEffect(this.uuid, effectID, effectData, effectTime, ambience, particles);
	};
	Actor.prototype.addPosition = function(x, y, z){
		if(typeof x == "object")
			return this.addPosition(x.x, x.y, x.z);
		Entity.addPosition(this.uuid, x, y, z);
	};
	Actor.prototype.addVelocity = function(x, y, z){
		if(typeof x == "object")
			return this.addVelocity(x.x, x.y, x.z);
		Entity.addVelocity(this.uuid, x, y, z);
	};
	Actor.prototype.clearEffect = function(effectID){
		Entity.clearEffect(this.uuid, effectID);
	};
	Actor.prototype.clearEffects = function(effects){
		if(effects) for(let i in effects){
			this.clearEffect(effects[i]);
		} else Entity.clearEffects(this.uuid);
	};
	Actor.prototype.damage = function(damage, callbackData){
		Entity.damageEntity(this.uuid, damage, callbackData.cause, {attacker: callbackData.attacker, bool1: callbackData.reduceArmor});
	};
	Actor.prototype.decreaseCarriedItem = function(count){
		let stack = this.getCarriedItem();
		stack.decrease(count);
	};
	Actor.prototype.getAge = function(){
		return Entity.getAge(this.uuid);
	};
	Actor.prototype.getAttribute = function(attributeName){
		return Entity.getAttribute(this.uuid, attributeName);
	};
	Actor.prototype.getCompoundTag = function(){
		return Entity.getCompoundTag(this.uuid);
	};
	Actor.prototype.getCarriedItem = function(){
		let stack = new _ItemStack(Entity.getCarriedItem(this.uuid));
		stack.link(EStackLinkType.CARRIED_ITEM, this);
		return stack;
	};
	Actor.prototype.getDimension = function(){
		return Entity.getDimension(this.uuid);
	};
	Actor.prototype.setRegion = function(region){
		this.region = new _WorldRegion(region);
	};
	Actor.prototype.getRegion= function(){
		if(this.getDimension() != this.lastDimension)
			this.setRegion(_WorldRegion.getForActor(this.uuid));
		return this.region;
	};
	Actor.prototype.getDistanceToCoords = function (x, y, z){
		if(typeof x == "number")
			return this.getDistanceToCoords(new Vec3d(x, y, z));
		return Entity.getDistanceToCoords(this.uuid, x);
	};
	Actor.prototype.getDistanceToEntity = function(entity){
		if(__instanceOf(entity, Actor))
			return this.getDistanceToEntity(entity.getUid());
		return Entity.getDistanceToEntity(this.uuid, entity);
	};
	Actor.prototype.getEffect = function(effectID){
		return Entity.getEffect(this.uuid, effectID);
	};
	Actor.prototype.getHealth = function(){
		return Entity.getHealth(this.uuid);
	};
	Actor.prototype.getLookAngle = function(){
		return Entity.getLookAngle(this.uuid);
	};
	Actor.prototype.getPitch = function(){
		return this.getLookAngle().pitch;
	};
	Actor.prototype.getYaw = function(){
		return this.getLookAngle().yaw;
	};
	Actor.prototype.getLookVector = function(){
		return new Vec3d(Entity.getLookVector(this.uuid));
	};
	Actor.prototype.getMaxHealth = function(){
		return Entity.getMaxHealth(this.uuid);
	};
	Actor.prototype.getMobile = function(){
		return Entity.getMobile(this.uuid);
	};
	Actor.prototype.getMovingAngle = function(){
		return Entity.getMovingAngle(this.uuid);
	};
	Actor.prototype.getMovingVector = function(){
		return new Vec3d(Entity.getMovingVector(this.uuid));
	};
	Actor.prototype.getOffhandItem = function(){
		let stack = Entity.getOffhandItem(this.uuid);
		stack.link(EStackLinkType.OFFHAND_ITEM, this.uuid);
		return stack;
	};
	Actor.prototype.getPathNavigation = function(){
		return Entity.getPathNavigation(this.uuid);
	};
	Actor.prototype.getPosition = function(){
		return new Vec3d(Entity.getPosition(this.uuid));
	};
	Actor.prototype.getRegion = function(){
		return _WorldRegion.getForActor(this);
	};
	Actor.prototype.getRenderType = function(){
		return Entity.getRender(this.uuid);
	};
	Actor.prototype.getRider = function(){
		let rider = Entity.getRider(this.uuid);
		return EntityType.buildEntityFor(Entity.getType(rider), rider);
	};
	Actor.prototype.getRindig = function(){
		let riding = Entity.getRiding(this.uuid);
		if(riding)
			return EntityType.buildEntityFor(Entity.getType(riding), rinding);
	};
	Actor.prototype.getSneaking = function(){
		return Entity.getSneaking(this.uuid);
	};
	Actor.prototype.getTarget = function(){
		let target = Entity.getTarget(this.uuid);
		if(target)
			return EntityType.buildEntityFor(Entity.getType(target), target);
	};
	Actor.prototype.getType = function(){
		return Entity.getTypeAddon(this.uuid) || this.__type;
	};
	Actor.prototype.getVelocity = function(){
		return new Vec3d(Entity.getVelocity(this.uuid));
	};
	Actor.prototype.hasEffect = function(effectID){
		return Entity.hasEffect(this.uuid, effectID);
	};
	Actor.prototype.hasEffects = function(effects){
		for(let i in effects)
			if(!this.hasEffect(effects[i]))
				return false;
		return true;
	};
	Actor.prototype.heal = function(value){
		Entity.healEntity(this.uuid, value);
	};
	Actor.prototype.isAlive = function(){
		return Entity.isExist(this.uuid);
	};
	Actor.prototype.lookAt = function(x, y, z){
		if(typeof x == "object")
			return this.lookAt(x.x, x.y, x.z);
		Entity.lookAt(this.uuid, x, y, z);
	};
	Actor.prototype.moveToAngle = function(pitch, yaw, denyY, jumpVel, speed){
		if(typeof pitch == "object")
			return this.moveToAngle(pitch.pitch, pitch.yaw, yaw, denyY, jumpVel);
		if(typeof denyY == "object")
			return this.moveToAngle(pitch, yaw, denyY.denyY, denyY.jumpVel, denyY.speed);
		Entity.moveToAngle(this.uuid, {pitch: pitch, yaw: yaw}, {denyY: denyY, jumpVel: jumpVel, speed: speed});
	};
	Actor.prototype.moveToTarget = function(x, y, z, denyY, jumpVel, speed){
		if(typeof x == "object")
			return this.moveToTarget(x.x, x.y, x.z, y, z, denyY);
		if(typeof denyY == "object")
			return this.moveToTarget(x, y, z, denyY.denyY, denyY.jumpVel, denyY.speed);
		Entity.moveToTarget(this.uuid, {x: x, y: y, z: z}, {denyY: denyY, jumpVel: jumpVel, speed: speed});
	};
	Actor.prototype.kill = function(){
		this.region.removeEntity(this);
	};
	Actor.prototype.ride = function(entity){
		if(__instanceOf(entity, Actor))
			return this.ride(entity.getUid());
		Entity.rideAnimal(thisml.uuid, entity);
	};
	Actor.prototype.setAge = function(age){
		Entity.setAge(this.uuid, age);
	};
	Actor.prototype.setCompoundTag = function(tag){
		Entity.setCompoundTag(this.uuid, tag);
	};
	Actor.prototype.setCarriedItem = function(stackOrId, count, data, extra){
		let stack = new _ItemStack(stackOrId, count, data, extra);
		Entity.setCarriedItem(this.uuid, stack.getId(), stack.getCount(), stack.getData(), stack.getExtra());
	};
	Actor.prototype.setFire = function(fire, force){
		Entity.setFire(this.uuid, fire, force);
	};
	Actor.prototype.setHealth = function(value){
		Entity.setHealth(this.uuid, value);
	};
	Actor.prototype.setHitbox = function(w, h){
		Entity.setHitbox(this.uuid, w, h);
	};
	Actor.prototype.setLookAngle = function(yaw, pitch){
		if(typeof yaw == "object")
			return this.setLookAngle(yaw.yaw, yaw.pitch);
		Entity.setLookAngle(this.uuid, yaw, pitch);
	};
	Actor.prototype.setMaxHealth = function(value){
		Entity.setMaxHealth(this.uuid, value);
	};
	Actor.prototype.setMobile = function(mobile){
		Entity.setMobile(this.uuid, mobile);
	};
	Actor.prototype.setOffhandItem = function(stackOrId, count, data, extra){
		let stack = new _ItemStack(stackOrId, count, data, extra);
		Entity.setOffhandItem(this.uuid, stack.getId(), stack.getCount(), stack.getData(), stack.getExtra());
	};
	Actor.prototype.setPosition = function(x, y, z){
		if(typeof x == "object")
			return this.setPosition(x.x, x.y, x.z);
		Entity.setPosition(this.uuid, x, y, z);
	};
	Actor.prototype.setRenderType = function(type){
		Entity.setRender(this.uuid, type);
	};
	Actor.prototype.setSneaking = function(value){
		Entity.setSneaking(this.uuid, value);
	};
	Actor.prototype.setTarget = function(entity){
		if(__instanceOf(entity, Actor))
			return this.setTarget(entity.getUid());
		Entity.setTarget(this.uuid, entity);
	};
	Actor.prototype.setVelocity = function(x, y, z){
		if(typeof x == "object")
			return this.setVelocity(x.x, x.y, x.z);
		Entity.setVelocity(this.uuid, x, y, z);
	};

	return Actor;
}());

let ItemEntity = (function(_super){
	__extends(ItemEntity, _super);

	function ItemEntity(uuid){
		if(Entity.getType(uuid) != 64) throw new Error("entity with uuid: " + uuid + ", is not a item");
		_super.call(this, uuid);
		this.stack = new _ItemStack(Entity.getDroppedItem(this.getUid()));
		this.stack.link(EStackLinkType.DROPPED_ITEM, this);
		//this.canPickup = true;
		return this;
	};

	ItemEntity.prototype.getItemStack = function(){
		return this.stack;
	};
	ItemEntity.prototype.setItemStack = function(idOrStack, count, data, extra){
		this.stack = new _ItemStack(idOrStack, count, data, extra);
		this.stack.link(EStackLinkType.DROPPED_ITEM, this);
		Entity.setDroppedItem(this.getUid(), this.stack.getId(), this.stack.getCount(), this.stack.getData(), this.stack.getExtra());
		this._fixPickup();
	};
	ItemEntity.prototype._fixPickup= function(){
		/*if(this.canPickup){
			let age = this.getCompoundTag().getShort("Age");
			if(age < 40){
				this.canPickup = false;
				this.stack.unlink();
				Entity.setDroppedItem(this.uuid, this.stack.getId(), -1, this.stack.getData(), this.stack.getExtra());
				let that = this;
				setTimeout(function(){
					that.canPickup = true;
					that.stack.link(EStackLinkType.DROPPED_ITEM, that);
					that.stack._synchronize();
				}, 40 - age);
			}
		}*/
	};

	return ItemEntity;
}(Actor));

let _PlayerEntity = (function(_super){
	__extends(_PlayerEntity, _super);

	function _PlayerEntity(uuid){
		if(Entity.getType(uuid) != 63) throw new Error("entity with uuid: " + uuid + ", is not a player");
		_super.call(this, uuid);
		this.__playerActor = new PlayerActor(uuid);
	};

	_PlayerEntity.prototype.getGameMode = function(){
		return this.__playerActor.getGameMode();
	};
	_PlayerEntity.prototype.addItemToInventory = function(stackOrId, count, data, extra){
		let stack = new _ItemStack(stackOrId, count, data, extra);
		this.__playerActor.addItemToInventory(stack.getId(), stack.getCount(), stack.getData(), stack.getExtra(), true);
	};
	_PlayerEntity.prototype.getInventorySlot = function(slot){
		let stack = new _ItemStack(this.__playerActor.getInventorySlot(slot));
		stack.link(EStackLinkType.INVENTORY_SLOT, this, slot);
		return stack;
	};
	_PlayerEntity.prototype.setInventorySlot = function(slot, stackOrId, count, data, extra){
		let stack = new _ItemStack(stackOrId, count, data, extra);
		this.__playerActor.setInventorySlot(slot, stack.getId(), stack.getCount(), stack.getData(), stack.getExtra());
	};
	_PlayerEntity.prototype.getArmorSlot = function(slot){
		let stack = new _ItemStack(this.__playerActor.getArmor(slot));
		stack.link(EStackLinkType.ARMOR_SLOT, this, slot);
		return stack;
	};
	_PlayerEntity.prototype.setArmorSlot = function(slot, stackOrId, count, data, extra){
		let stack = new _ItemStack(stackOrId, count, data, extra);
		this.__playerActor.setArmor(slot, stack.getId(), stack.getCount(), stack.getData(), stack.getExtra());
	};
	_PlayerEntity.prototype.getClient = function(){
		return Network.getClientForPlayer(this.getUid());
	};
	_PlayerEntity.prototype.setRespawnCoords = function(vecOrX, y, z){
		let vec = new Vec3d(vecOrX, y, z);
		this.__playerActor.setRespawnCoords(vec.getX(), vec.getY(), vec.getZ());
	};
	_PlayerEntity.prototype.getSelectedSlot = function(){
		return this.__playerActor.getSelectedSlot();
	};
	_PlayerEntity.prototype.setSelectedSlot = function(slot){
		this.__playerActor.setSelectedSlot(slot);
	};
	_PlayerEntity.prototype.getExperience = function(){
		return this.__playerActor.getExperience();
	};
	_PlayerEntity.prototype.setExperience = function(value){
		this.__playerActor.setExperience(value);
	};
	_PlayerEntity.prototype.addExperience = function(value){
		this.__playerActor.addExperience(value);
	};
	_PlayerEntity.prototype.getLevel = function(){
		return this.__playerActor.getLevel();
	};
	_PlayerEntity.prototype.setLevel = function(level){
		this.__playerActor.setLevel(level);
	};
	_PlayerEntity.prototype.getExhaustion = function(){
		return this.__playerActor.getExhaustion();
	};
	_PlayerEntity.prototype.setExhaustion = function(value){
		this.__playerActor.setExhaustion(value);
	};
	_PlayerEntity.prototype.getHunger = function(){
		return this.__playerActor.getHunger();
	};
	_PlayerEntity.prototype.setHunger = function(value){
		this.__playerActor.setHunger(value);
	};
	_PlayerEntity.prototype.getSaturation = function(){
		return this.__playerActor.getSaturation();
	};
	_PlayerEntity.prototype.setSaturation = function(value){
		this.__playerActor.setSaturation(value);
	};
	_PlayerEntity.prototype.getScore = function(){
		return this.__playerActor.getScore();
	};
	_PlayerEntity.prototype.setScore = function(value){
		this.__playerActor.setScore(value);
	};
	_PlayerEntity.prototype.getItemUseDuration = function(){
		return this.__playerActor.getItemUseDuration();
	};
	_PlayerEntity.prototype.getItemUseIntervalProgress = function() {
		return this.__playerActor.getItemUseIntervalProgress();
	};
	_PlayerEntity.prototype.getItemUseStartupProgress = function() {
		return this.__playerActor.getItemUseStartupProgress();
	};

	_fieldGetter(_PlayerEntity.prototype, "inventory", function(){
		let inventory = {mainInventory: [], armorInventory: [], offhandInventory: [this.getOffhandItem()]};
		for(let i = 0; i < 32; i++)
			inventory.mainInventory.push(this.getInventorySlot(i));
		for(let i = 0; i < 4; i++)
			inventory.armorInventory.push(this.getArmorSlot(i));
		return inventory;
	});

	return _PlayerEntity;
}(Actor));

let UpdatableClass = (function(){

	function UpdatableClass(){
		this.remove = false;
		this.update = function(){
			if(!this.remove && !this.stopped && this.isLoaded()) this.onTick();
		}
		return this;
	};

	UpdatableClass.prototype.onTick = function (){};
	UpdatableClass.prototype.isAlive = function (){
		return !this.remove;
	};
	UpdatableClass.prototype.isLoaded = function(){
		return true;
	};
	UpdatableClass.prototype.kill = function (){
		this.remove = true;
	};
	UpdatableClass.prototype.stop = function (){
		this.stopped = true;
	};
	UpdatableClass.prototype.play = function (){
		this.stopped = false;
	};
	UpdatableClass.prototype.load = function (){
		Updatable.addUpdatable(this);
	};

	return UpdatableClass;
}());

let asyncPointedData = {};
	
Network.addClientPacket("SUGAr-client:async_get_pointed", function(packet){
	if(packet.uuid)
		Network.sendToServer("SUGAr-server:async_get_pointed", {uuid: packet.uuid, pointed: Player.getPointed()});
});

Network.addServerPacket("SUGAr-server:async_get_pointed", function(client, packet){
	if(packet.uuid && packet.pointed)
		asyncPointedData[packet.uuid] = packet.pointed;
});

function asyncGetPointed(player, func){
	let uuid = randKey();
	let client = player.getClient();
	client.send("SUGAr-client:async_get_pointed", {uuid: uuid});
	Updatable.addUpdatable({
		t: 0,
		update(){
			if(this.t > 30){
				alert("Bad internet");
				this.remove = true;
			};
			this.t++;
			if(asyncPointedData[uuid]){
				func(asyncPointedData[uuid]);
				delete asyncPointedData[uuid];
				this.remove = true;
			}
		}
	});
};

let TickableEntity = (function(_super) {
	__extends(TickableEntity, _super);
	
	const MAP = TickableEntity.MAP = {};
	const LIST = TickableEntity.LIST = [];

	let tickableEntityCheckIndex = 0;
	Callback.addCallback("tick", function (){
		/*for (let i = 0; i < LIST.length / 128; i++) {
			tickableEntityCheckIndex = (tickableEntityCheckIndex + 1) % LIST.length;
			checkTickableEntityForIndex(tickableEntityCheckIndex);
		}*/
	});

	Callback.addCallback("ItemUseNoTarget", function(item, player){
		player = new _PlayerEntity(player);
		asyncGetPointed(player, function(pointed){
			let region = _WorldRegion.getForActor(player);
			let playerPos = player.getPosition();
			let lookEnd = player.getLookVector().multiply(5.5).add(playerPos);
			let nearestEntities = TickableEntity.getAllInRange(region, playerPos, 11);
			let stack = new _ItemStack(item);
			stack.link(EStackLinkType.CARRIED_ITEM, player);
			for(let i in nearestEntities){
				let entity = nearestEntities[i];
				let shape = entity.getShape();
				let intersectPoint = shape.offset(entity.getPos()).calculateIntercept(playerPos, lookEnd);
				if(intersectPoint)
					entity.onInteract(intersectPoint, stack, player);
			}
		});
	});

	function TickableEntity(region) {
		_super.call(this);
		this.__isLoaded = false;
		this.__initialized = false;
		this.uuid = java.util.UUID.randomUUID().toString();
		this.region = region;
		this.rotationPitch = 0;
		this.rotationYaw = 0;
		this.pos = new Vec3d(Vec3d.ZERO);
		this.motion = new Vec3d(Vec3d.ZERO);
		this.__client = {onTick: this.clientTick};
		this.networkData = new SyncedNetworkData();

		this.update = function(){
			try {
				if (this.__isLoaded && !this.__initialized && !this._runInit()) 
					return;
				if (this.onTick && !this.stopped && LevelDisplayedQueue.isDisplayed)
					this.onTick();
			} catch(e){
				throw e;
				this.stop();
			}
		};
		return this;
	};

	TickableEntity.prototype._runInit = function() {
		if (!this.region) {
				this.__isLoaded = false;
			return false;
		}
		if (!this.isLoaded()) {
			this.__isLoaded = false;
			return false;
		}
		/*if (this.useNetworkItemContainer) {
			this.container.setClientContainerTypeName(this.networkEntityType.getTypeName());
			// setup server side container events
			if (this.containerEvents) {
				var that = this;
				function addContainerEventListener(name, func) {
					that.container.addServerEventListener(name, function(container, client, packetData) {
						func.call(that, packetData, client);
					});
				}
				for (var name in this.containerEvents) {
					addContainerEventListener(name, this.containerEvents[name]);
				}
			}
		}*/
		Saver.registerObject(this, this.getEntityType().saverId);
		this.dimension = this.region.getDimension();
		this._initNetwork();
		this.networkEntity = new NetworkEntity(this.networkEntityType, this);
		this.networkData.setClients(this.networkEntity.getClients());
		this.onInit();
		this.onLoad();
		this.__initialized = true;
		return true;
	};
	TickableEntity.prototype.clientTick = function(){};
	TickableEntity.prototype._initNetwork = function(){
		let that = this;
		this.networkEntityType = new NetworkEntityType("TiE:" + this.getEntityType().getName())
			.setClientListSetupListener(function(list, target, entity) {
				list.setupDistancePolicy(target.getPosX(), target.getPosY(), target.getPosZ(), target.getDimension(), target.networkVisibilityDistance || 128);
			})
			.setClientEntityAddedListener(function(entity, packet) {
				let client = {
					x: packet.x,
					y: packet.y,
					z: packet.z,
					dimension: packet.d,
					networkData: SyncedNetworkData.getClientSyncedData(packet.sd),
					networkEntity: entity,
					__initialized: false,
					noupdate: false,
					remove: false,
					update: function() {
						if (!this.__initialized) {
							this.__initialized = true;
							this.onLoad();
							this.remove = this.remove || !this.onTick;
							if (this.remove) {
								return;
							}
						}
						this.onTick();
					},

					onLoad: function() {},
					onTick: function() {},
					onUnload: function() {},
					sendPacket: function(name, data) {
						this.networkEntity.send(name, data);
					}
				};

				if (that.__client) {
					for (let name in that.__client) {
						client[name] = that.__client[name];
					}
				}

				Updatable.addLocalUpdatable(client);
				return client;
			})
			.setClientEntityRemovedListener(function(target, entity) {
				target.onUnload();
				target.remove = true;
			})
			.setClientAddPacketFactory(function(target, entity, client) {
				return {
					x: target.getPosX(),
					y: target.getPosY(),
					z: target.getPosZ(),
					d: target.getDimension(),
					sd: "" + target.networkData.getName()
				}
			});

		if (this.__events) {
			function addServerPacketListener(name, func) {
				this.networkEntityType.addServerPacketListener(name, function(target, entity, client, packetData, packetExtra) {
					func.call(target, packetData, packetExtra, client);
				});
			}
			for (let name in this.__events) {
				addServerPacketListener(name, this.__events[name]);
			}
		}

		if (this.__client && this.__client.events) {
			function addClientPacketListener(name, func) {
				this.networkEntityType.addClientPacketListener(name, function(target, entity, packetData, packetExtra) {
					func.call(target, packetData, packetExtra);
				});
			}
			for (let name in this.__client.events) {
				addClientPacketListener(name, this.__client.events[name]);
			}
		}
	};
	TickableEntity.prototype.onInit = function(){};
	TickableEntity.prototype.onLoad = function(){};
	TickableEntity.prototype.onUnload = function(){};
	TickableEntity.prototype.isLoaded = function (){
		let chunkX = Math.floor(this.pos.getX() / 16);
		let chunkZ = Math.floor(this.pos.getZ() / 16);
		return this.region.isChunkLoaded(chunkX, chunkZ) &&
			this.region.isChunkLoaded(chunkX + 1, chunkZ + 1) &&
			this.region.isChunkLoaded(chunkX + 1, chunkZ - 1) &&
			this.region.isChunkLoaded(chunkX - 1, chunkZ + 1) &&
			this.region.isChunkLoaded(chunkX - 1, chunkZ - 1);
	};
	TickableEntity.prototype.getDimension = function(){
		return this.dimension;
	};
	TickableEntity.prototype.getEntityType = function(){
		return EntityType.getFor(this.constructor.name);
	};
	TickableEntity.prototype.getEntityTypeName = function(){
		return this.getEntityType().getName();
	};
	TickableEntity.prototype.onTick = function() {
		this.updatePosition();
	};
	TickableEntity.prototype.onInteract = function(interceptPoint, stack, player){};
	TickableEntity.prototype.setLocationAndAngles = function(x, y, z, pitch, yaw) {
		this.setPosition(x, y, z);
		this.rotationPitch = pitch;
		this.rotationYaw = yaw;
	};
	TickableEntity.prototype.setPosition = function(x, y, z) {
		this.pos = new Vec3d(x, y, z);
	};
	TickableEntity.prototype.getPos = function() {
		return this.pos;
	};
	TickableEntity.prototype.getPosition = function(){
		return this.getPos();
	};
	TickableEntity.prototype.getPosX = function() {
		return this.pos.getX();
	};
	TickableEntity.prototype.getPosY = function() {
		return this.pos.getY();
	};
	TickableEntity.prototype.getPosZ = function() {
		return this.pos.getZ();
	};
	TickableEntity.prototype.getX = function() {
		return this.pos.getX();
	};
	TickableEntity.prototype.getY = function() {
		return this.pos.getY();
	};
	TickableEntity.prototype.getZ = function() {
		return this.pos.getZ();
	};
	TickableEntity.prototype.setMotion = function(x, y, z) {
		this.motion = new Vec3d(x, y, z);
	};
	TickableEntity.prototype.getMotion = function() {
		return this.motion;
	};
	TickableEntity.prototype.getShape = function(){
		return new AxisAlignedBB(0,0,0,0,0,0);
	};
	TickableEntity.prototype.updatePosition = function() {
		this.pos = this.pos.add(this.motion);
		if (this.region.getBlock(new BlockPos(this.pos)).id) this.onImpact();
	};
	TickableEntity.prototype.onImpact = function() {};
	TickableEntity.prototype.entityDropItem = function(stack) {
		if (!stack.isEmpty())
			return this.region.dropItem(this.pos, stack);
		return null;
	};
	TickableEntity.prototype.kill = function (){
		_super.prototype.kill.call(this);
		this.__isLoaded = false;
		if(this.networkEntity){
			this.networkEntity.remove();
			this.networkEntity = null;
		}
		this.onUnload();
		delete MAP[this.getUid()];
		let index = LIST.indexOf(this);
		if(!!~index) LIST.splice(index, 1);
	};
	TickableEntity.prototype.load = function (){
		_super.prototype.load.call(this);
		this.__isLoaded = true;
	};
	TickableEntity.prototype.getUid = function(){
		return this.uuid;
	};
	TickableEntity.prototype.read = function(obj){
		this.uuid = obj.uuid;
		if(obj.__isLoaded && !MAP[this.getUid()]) {
			this.load();
			MAP[this.getUid()] = this;
			LIST.push(this);
		}
		this.region = _WorldRegion.getForDimension(obj.dimension);
		this.rotationPitch = obj.rotatePitch;
		this.rotateYaw = obj.rotateYaw;
		this.pos = new Vec3d(obj.pos);
		this.motion = new Vec3d(obj.motion);
	};
	TickableEntity.prototype.write = function(obj){
		obj.__isLoaded = this.__isLoaded;
		obj.uuid = this.uuid;
		obj.dimension = this.region.getDimension();
		obj.rotatePitch = this.rotatePitch;
		obj.rotateYaw = this.rotateYaw;
		obj.pos = {x: this.pos.getX(), y: this.pos.getY(), z: this.pos.getZ()};
		obj.motion = {x: this.motion.getX(), y: this.motion.getY(), z: this.motion.getZ()};
	};
	TickableEntity.prototype.toString = function(){
		return "TiE:" + this.getUid();
	};
	function checkTickableEntityForIndex(index) {
		let tickableEntity = LIST[index];
		let wasLoaded = tickableEntity.__isLoaded;
		tickableEntity.__isLoaded = tickableEntity.isLoaded();
		if (tickableEntity.__initialized) {
			if (!wasLoaded && tickableEntity.__isLoaded) {
				tickableEntity.onLoad();
			}
			if (wasLoaded && !tickableEntity.__isLoaded) {
				tickableEntity.onUnload();
			}
		}
		if (tickableEntity.networkEntity) {
			tickableEntity.networkEntity.refreshClients();
		}
	}

	TickableEntity.checkTickableEntityForIndex = checkTickableEntityForIndex;

	function getAllInRange(region, coords, range, type){
		if(type && __instanceOf(type, EntityType)) type = type.getName();
		let arr = [];
		for(let i in LIST){
			let entity = LIST[i];
			if(entity.getPos().distanceTo(coords) <= range && (!type || entity.getEntityTypeName() == type))
				arr.push(entity);
		}

		return arr;
	};
	TickableEntity.getAllInRange = getAllInRange;
 
	return TickableEntity;
}(UpdatableClass));

let EntityType = (function() {

	const EntityTypes = {};

	function EntityType(typeName, constructor) {
		this.name = typeName;
		this._isVanilla = typeof typeName == "number";
		this.builder = constructor;
		return this;
	};

	EntityType.prototype.buildEntity = function() {
		return new (this.builder.bind.apply(this.builder, [this.builder].concat([].slice.call(arguments))))();
	};
	EntityType.prototype.isVanilla = function(){
		return this._isVanilla;
	};

	function create(constructor) {
		if(__constructorOf(constructor, Actor))
			return new EntityType(getVanillaType(constructor), constructor);
		else if(__constructorOf(constructor, TickableEntity))
			return new EntityType(constructor.name, constructor);
	};
	EntityType.create = create;

	function getVanillaType(clazz){
		switch(clazz){
			case _PlayerEntity:
				return 63;
			case ItemEntity:
				return 64;
			default:
				return 0;
		}
		return null;
	};
	EntityType.getVanillaType = getVanillaType;

	function getFor(type){
		if(type instanceof java.lang.Number) type = Number(type);
		return EntityTypes[type];
	};
	EntityType.getFor = getFor;
	
	function isVanilla(entityType){
		return entityType.isVanilla();
	};
	EntityType.isVanilla = isVanilla;

	function buildEntityFor(type) {
		let entityType = getFor(type);
		return entityType.buildEntity.apply(entityType, [].slice.call(arguments, 1));
	};
	EntityType.buildEntityFor = buildEntityFor;

	function register(entityType) {
		if (EntityTypes[entityType.name]) throw new Error("EntityType is exist: " + entityType.name);
		entityType.builder.prototype.__type = entityType.name;
		EntityTypes[entityType.name] = entityType;

		if(!isVanilla(entityType)) registerSaverIfNeeded(entityType);
	};

	function registerSaverIfNeeded(entityType){
		if(!entityType.saverId) entityType.saverId = Saver.registerObjectSaver("TICKABLE:" + entityType.getName().toUpperCase(), {
			read(obj){
				if(!obj || !obj.__type || !obj.uuid) return null;
				let instance = TickableEntity.MAP[obj.uuid];
				if(!instance || obj.__type != entityType.name)
					instance = buildEntityFor(obj.__type);
				instance.read(obj);
				return instance;
			},
			save(instance){
				if(instance.remove) return null;
				let obj = {__type: entityType.getName()};
				instance.write(obj);
				return obj;
			}
		});
	};

	EntityType.prototype.register = function() {
		register(this);
	};
	EntityType.prototype.getName = function(){
		return this.name;
	};

	(function registerVanillaEntityTypes(){
		create(Actor).register();
		create(_PlayerEntity).register();
		create(ItemEntity).register();
	}());

	return EntityType;
}());

let IMultiblock = new Interface();

let AbstractMultiblock = (function (){
	__implements(AbstractMultiblock, IMultiblock);

	function AbstractMultiblock(){
		this.teCache = {};
		return this;
	};

	AbstractMultiblock.prototype.offset = function(x, y, z) {
		return this.setOffset(this.offX + x, this.offY + y, this.offZ + z);
	};
	AbstractMultiblock.prototype.setOffset = function(x, y, z) {
		this.offX = x;
		this.offY = y;
		this.offZ = z;
		return this.setViewOffset(x, y, z);
	};
	AbstractMultiblock.prototype.offsetView = function(x, y, z) {
		return this.setViewOffset(this.viewOffX + x, this.viewOffY + y, this.viewOffZ + z);
	};
	AbstractMultiblock.prototype.setViewOffset = function(x, y, z) {
		this.viewOffX = x || this.offX;
		this.viewOffY = y || this.offY;
		this.viewOffZ = z || this.offZ;
		return this;
	};
	AbstractMultiblock.prototype.setSymmetrical = function (symmetrical) {
		this.symmetrical = symmetrical;
		return this;
	};
	AbstractMultiblock.prototype.getID = function() {
		return this.id;
	};
	AbstractMultiblock.prototype.setId = function(res) {
		this.id = res;
		return this;
	};
	AbstractMultiblock.prototype.place = function(region, pos, rot) {
		this.setWorld(region);
		let arr = this.simulate(region, pos, rot, false)[1];
		for(let i in arr){
			let r = arr[i];
			let placePos = r.getWorldPosition();
			let targetState = r.getState();
			let targetBlock = targetState.getBlock();
			if (targetState.id != 0 && targetBlock ? targetBlock.isValidPosition(region, placePos) : true && canTileBeReplaced(region.getBlock(placePos).id)) {
				region.setBlock(placePos, targetState.id, targetState.data);
			}
		};
	};
	AbstractMultiblock.prototype.setRegion = function(region) {
		this.region = region;
	};
	AbstractMultiblock.prototype.validate = function (region, pos, rotation){
		if(!rotation){
			if (this.isSymmetrical() && this.validate(region, pos, Rotation.NONE)) {
				return Rotation.NONE;
			} else {
				let rots = Rotation.values();
				for (let i in rots) {
					let rot = rots[i];
					if (this.validate(region, pos, rot)) {
						return rot;
					}
				}
			}
			return null;
		} else {
			this.setRegion(region);
			let sim = this.simulate(region, pos, rotation, false)[1];
			for(let i in sim){
				let r = sim[i];
				if(!r.test(region, rotation)) return false;
			}
			return true;
		}
	};
	AbstractMultiblock.prototype.isSymmetrical = function (){
		return this.symmetrical;
	};
	AbstractMultiblock.prototype.getTileEntity = function(pos) {
		return this.region.addTileEntity(pos);
	};

	return AbstractMultiblock;
}());

let DenseMultiblock = (function (_super){
	__extends(DenseMultiblock, _super);

	function DenseMultiblock(pattern, targets) {
		let _targets;
		if(arguments.length == 1 && !__instanceOf(arguments[1], AbstractBlockState)){
			_targets = targets;
		} else {
			let _args = [];
			for(let i = 1; i < arguments.length; i++) _args.push(arguments[i]);
			_targets = this.targetsToMatchers.apply(this, _args);
		}
		this.pattern = pattern;
		this.size = this.build(_targets, getPatternDimensions(pattern));
	};

	DenseMultiblock.prototype.simulate = function(region, anchor, rotation, forView) {
		let disp = forView
				? new BlockPos(-this.viewOffX, -this.viewOffY + 1, -this.viewOffZ).rotate(rotation)
				: new BlockPos(-this.offX, -this.offY, -this.offZ).rotate(rotation);
		// the local origin of this multiblock, in world coordinates
		let origin = anchor.add(disp);
		let ret = [];
		for (let x = 0; x < this.size.getX(); x++) {
			for (let y = 0; y < this.size.getY(); y++) {
				for (let z = 0; z < this.size.getZ(); z++) {
					let currDisp = new BlockPos(x, y, z).rotate(rotation);
					let actionPos = origin.add(currDisp);
					let currC = this.pattern[y][x][z];
					ret.push(new SimulateResult(actionPos, this.stateTargets[x][y][z], currC));
				}
			}
		}
		return [origin, ret];
	};
	DenseMultiblock.prototype.test = function(region, start, x, y, z, rotation) {
		this.setRegion(region);
		if (x < 0 || y < 0 || z < 0 || x >= this.size.getX() || y >= this.size.getY() || z >= this.size.getZ()) {
			return false;
		}
		let checkPos = start.add(new BlockPos(x, y, z).rotate(RotationUtil.fixHorizontal(rotation)));
		let state = stateTargets[x][y][z];
		let state2 = region.getBlock(checkPos);

		return state.id == state2.id && state.data == state2.data;
	};
	DenseMultiblock.prototype.targetsToMatchers = function(_targets) {
		let targets;
		if(arguments[1]) {targets = [];
		    for(let i = 0; i < arguments.length; i++) targets.push(arguments[i]);
	    } else targets = _targets;
		if (targets.length % 2 == 1) {
			throw new Exception("Illegal argument length for targets array " + targets.length);
		}
		let stateMap = {};
		for (let i = 0; i < targets.length / 2; i++) {
			let c =  targets[i * 2];
			let o = targets[i * 2 + 1];
			let state;

			if (__instanceOf(o, _BlockBase)) {
				state = new AbstractBlockState({id: o.id, data: 0});
			} else if (__instanceOf(o, AbstractBlockState)) {
				state = o;
			} else {
				new Exception("invalid targets argument");
			}

			stateMap[c] = state;
		}

		if (!stateMap[' ']) {
			stateMap[' '] = new AbstractBlockState({id: 0});
		}
		if (!stateMap['_']) {
			stateMap['_'] = new AbstractBlockState({id: 0});
		}
		if (!stateMap['0']) {
			stateMap['0'] = new AbstractBlockState({id: 0});
		}
		return stateMap;
	};
	DenseMultiblock.prototype.build = function(stateMap, dimensions) {
		let foundCenter = false;
		this.stateTargets = createMultiArray(dimensions.getX(), dimensions.getY(), dimensions.getZ());
		for (let y = 0; y < dimensions.getY(); y++) {
			for (let x = 0; x < dimensions.getX(); x++) {
				for (let z = 0; z < dimensions.getZ(); z++) {
					let c = this.pattern[y][x][z];
					if (!stateMap[c]) {
						throw new Exception("Character " + c + " isn't mapped");
					}

					let matcher = stateMap[c];
					if (c == '0') {
						if (foundCenter) {
							throw new Exception("A structure can't have two centers");
						}
						foundCenter = true;
						this.offX = x;
						this.offY = dimensions.getY() - y - 1;
						this.offZ = z;
						this.setViewOffset();
					}

					this.stateTargets[x][dimensions.getY() - y - 1][z] = matcher;
				}
			}
		}

		if (!foundCenter) {
			throw new Exception("A structure can't have no center");
		}
		return dimensions;
	};

	function getPatternDimensions(pattern) {
		let expectedLenX = -1;
		let expectedLenZ = -1;
		for (let i in pattern) {
			let arr = pattern[i];
			if (expectedLenX == -1) {
				expectedLenX = arr.length;
			}
			if (arr.length != expectedLenX) {
				throw new Exception("Inconsistent array length. Expected" + expectedLenX + ", got " + arr.length);
			}

			for (let j in arr) {
				let s = arr[j];
				if (expectedLenZ == -1) {
					expectedLenZ = s.length;
				}
				if (s.length != expectedLenZ) {
					throw new Exception("Inconsistent array length. Expected" + expectedLenX + ", got " + arr.length);
				}
			}
		}

		return new Vec3i(expectedLenX, pattern.length, expectedLenZ);
	};
	DenseMultiblock.getPatternDimensions = getPatternDimensions;

	DenseMultiblock.prototype.getBlockState = function(pos) {
		let x = pos.getX();
		let y = pos.getY();
		let z = pos.getZ();
		if (x < 0 || y < 0 || z < 0 || x >= this.size.getX() || y >= this.size.getY() || z >= this.size.getZ()) {
			return new AbstractBlockState({id: 0});
		}
		return stateTargets[x][y][z];
	};
	DenseMultiblock.prototype.getSize = function() {
		return this.size;
	};

	function createMultiArray() {
		let dimensions = [];
		for (let i in arguments) dimensions.push(arguments[i]);
		if (!dimensions.length) {
			return null;
		}
	
		let array = [];
	
		function create(dimensions) {
			let newArray = [];
			for (let i = 0; i < dimensions[0]; i++) {
				if (dimensions.length > 1) {
					newArray[i] = create(dimensions.slice(1));
				} else {
					newArray[i] = null;
				}
			}
			return newArray;
		}
	
		return array = create(dimensions);
	}

	return DenseMultiblock;
}(AbstractMultiblock));

let MultiblockRegistry = (function (MultiblockRegistry){
	const MULTIBLOCKS = MultiblockRegistry.MULTIBLOCKS = {};

	function registerMultiblock(location, multiblock) {
		let prev = MULTIBLOCKS[location];
		if (prev != null) {
			throw new Exception("Multiblock " + location + " already registered");
		} else {
			return multiblock.setId(location);
		}
	};
	MultiblockRegistry.registerMultiblock = registerMultiblock;

	return MultiblockRegistry;
}(MultiblockRegistry || (MultiblockRegistry = {})));

let SimulateResult = (function (){ 

	function SimulateResult(worldPosition, state, character) {
		this.worldPosition = worldPosition;
		this.state = state;
		this.character = character;
	};

	SimulateResult.prototype.getWorldPosition = function() {
		return this.worldPosition;
	};
	SimulateResult.prototype.getState = function() {
		return this.state;
	};
	SimulateResult.prototype.getCharacter = function() {
		return this.character;
	};
	SimulateResult.prototype.test = function(region, rotation) {
		let state = region.getBlock(this.getWorldPosition());
		let state2 = this.getState();
		return state.id == state2.id && state.data == state2.data;
	};

	return SimulateResult;
}());

let ItemParams = (function(){

	const ParamsMap = ItemParams.ParamsMap = {};

	function ItemParams(name, p){
		if(!p){
			p = name;
			name = null;
		}
		if(name && ParamsMap[name]) throw new Error("parameters with the same name (" + name + ") already exist");
		p = p || {};
		this.category = p.category || 4;
		this.maxStack = p.maxStack || 64;
		this.maxDamage = p.maxDamage || 0;
		this.handEquipped = p.handEquipped;
		this.allowInOffHand = p.allowInOffHand || false;
		this.liquidClip = p.liquidClip || false;
		this.enchantType = p.enchantType;
		this.enchantability = p.enchantability;
		this.glint = p.glint || false;
		this.vanillaProps = p.vanillaProps;
		this.inCreative = p.inCreative || true;
		this.rarity = p.rarity;
		if(name) ParamsMap[name] = this;
		return this;
	};

	_getterAndSetterFunc(ItemParams, "category");
	_getterAndSetterFunc(ItemParams, "maxStack");
	_getterAndSetterFunc(ItemParams, "maxDamage");
	_getterAndSetterFunc(ItemParams, "handEquipped");
	_getterAndSetterFunc(ItemParams, "allowInOffHand");
	_getterAndSetterFunc(ItemParams, "liquidClip");
	_getterAndSetterFunc(ItemParams, "enchantType");
	_getterAndSetterFunc(ItemParams, "enchantability");
	_getterAndSetterFunc(ItemParams, "glint");
	_getterAndSetterFunc(ItemParams, "vanillaProps");
	_getterAndSetterFunc(ItemParams, "inCreative");
	_getterAndSetterFunc(ItemParams, "rarity");

	return ItemParams;
}());

let ItemArmorParams = (function(_super){
	__extends(ItemArmorParams, _super);

	function ItemArmorParams(name, p){
		if(!p){
			p = name;
			name = null;
		}
		_super.call(this, name, p);
		p = p || {};
		this.armor = p.armor;
		this.type = p.type,
		this.knockbackResist = p.knockbackResistance * 0.1125 || 0,
		this.texture = p.texture;
		this.category = p.category || ItemCategory.EQUIPMENT;
		this.material = p.material;
		return this;
	};

	_getterAndSetterFunc(ItemArmorParams, "armor");
	_getterAndSetterFunc(ItemArmorParams, "type");
	_getterAndSetterFunc(ItemArmorParams, "knockbackResist");
	_getterAndSetterFunc(ItemArmorParams, "texture");
	_getterAndSetterFunc(ItemArmorParams, "material");

	return ItemArmorParams
}(ItemParams));

let _ItemBase = (function(_super) {
	__extends(_ItemBase, _super);

	function _ItemBase(nameId, params, name) {
		_super.call(this, nameId, name);
		let textureName = "";
		for (let i = 0; i < this.stringID.length; i++) textureName += this.stringID[i].toLowerCase() != this.stringID[i].toUpperCase() && this.stringID[i] == this.stringID[i].toUpperCase() ? "_" + this.stringID[i].toLowerCase() : this.stringID[i];
		this.setIcon(textureName);
		this.applyParams(params || new ItemParams());
		return this;
	};

	_ItemBase.prototype.applyParams = function(p){
		this.params = p;
		this.setCategory(p.getCategory());
		this.setMaxStack(p.getMaxStack());
		this.setMaxDamage(p.getMaxDamage());
		this.setHandEquipped(p.getHandEquipped());
		this.allowInOffHand(p.getAllowInOffHand());
		this.setLiquidClip(p.getLiquidClip());
		this.setEnchantType(p.getEnchantType(), p.getEnchantability());
		this.setGlint(p.getGlint());
		this.setProperties(p.getVanillaProps());
		this.setRarity(p.getRarity());
	};
	_ItemBase.prototype.getParams = function(){
		return this.params;
	};
	_ItemBase.prototype.setParams = function(p){
		this.params = p;
	};
	_ItemBase.prototype.addToCreative = function(data, extra) {
		if (!_ItemRegistry.getInstanceOf(this.id)) {
			//ItemModel.getFor(this.id, data).setItemTexture(this.icon.name, data || 0);
			Item.addToCreative(this.id, 1, data || 0, extra);
		}
	};
	_ItemBase.prototype.createGroup = function(name, items) {
		Item.addCreativeGroup(name, Translation.translate("sugar.item_group." + this.icon.name), [this.id].concat(items || []));
	};
	_ItemBase.prototype.getModel = function(data){
		return ItemModel.getFor(this.id, data || 0);
	};
	_ItemBase.prototype.getStack = function(count, data, extra){
		return new ItemStack(this.id, count, data, extra);
	};
	_ItemBase.prototype.getIcon = function(){
		return this.icon;
	};
	_ItemBase.prototype.setCategory = function (category){
		this.category = category;
		if(this.item) Item.setCategory(this.id, category);

	};
	_ItemBase.prototype.setMaxStack = function (maxStack) {
		this.maxStack = maxStack;
		if(this.item) this.item.setMaxStackSize(maxStack);
	};
	_ItemBase.prototype.setMaxDamage = function (maxDamage) {
		this.maxDamage = maxDamage;
		if(this.item) this.item.setMaxDamage(maxDamage);
	};
	_ItemBase.prototype.setHandEquipped = function (enabled) {
		this.isHandEquipped = enabled;
		if(this.item) this.item.setHandEquipped(enabled);
	};
	_ItemBase.prototype.allowInOffHand = function () {
		this.isOffhandItem = true;
		if(this.item) this.item.setAllowedInOffhand(true);
	};
	_ItemBase.prototype.setLiquidClip = function () {
		this.isLiquidClip = true;
		if(this.item) this.item.setLiquidClip(true);
	};
	_ItemBase.prototype.setEnchantType = function (type, enchantability) {
		this.enchantType = type;
		this.enchantability = enchantability;
		if(this.item) this.item.setEnchantType(type, enchantability);
	};
	_ItemBase.prototype.setGlint = function (enabled) {
		this.glint = enabled;
		if(this.item) this.item.setGlint(enabled);
	};
	_ItemBase.prototype.addRepairItem = function (itemID) {
		this.repairItem = itemID;
		if(this.item) this.item.addRepairItem(itemID);
	};
	_ItemBase.prototype.setProperties = function (props) {
		this.properties = props;
		if(this.item) this.item.setProperties(JSON.stringify(props));
	};
	_ItemBase.prototype.createItem = function(){
		return Item.createItem(this.stringID, this.name, this.icon);
	};

	return _ItemBase;
}(ItemBase));

let IArmorMaterial = (function(){
	__enum(IArmorMaterial, "LEATHER", 5, [1, 2, 3, 1], 15, 0.0),
	__enum(IArmorMaterial, "CHAIN", 15, [1, 4, 5, 2], 12, 0.0),
	__enum(IArmorMaterial, "IRON", 15, [2, 5, 6, 2], 9, 0.0),
	__enum(IArmorMaterial, "GOLD", 7, [1, 3, 5, 2], 25, 0.0),
	__enum(IArmorMaterial, "DIAMOND", 33, [3, 6, 8, 3], 10, 2.0);

	function IArmorMaterial(maxDamageFactorIn, damageReductionAmountArrayIn, enchantabilityIn, soundEventIn){
		this.maxDamageFactor = maxDamageFactorIn;
		this.damageReductionAmountArray = damageReductionAmountArrayIn;
		this.enchantability = enchantabilityIn;
		this.soundEvent = soundEventIn;
		//this.toughness = toughnessIn;
	};

	IArmorMaterial.prototype.getDurability = function(armorType){
		return ItemArmor.MAX_DAMAGE_ARRAY[armorType.getIndex()] * this.maxDamageFactor;
	};
	IArmorMaterial.prototype.getDamageReductionAmount = function(armorType){
		return this.damageReductionAmountArray[armorType.getIndex()];
	};
	IArmorMaterial.prototype.getEnchantability = function(){
		return this.enchantability;
	};
	IArmorMaterial.prototype.getRepairItem = function(){
		switch(this.name()){
			case "leather":
				return VanillaItemID.leather;
			case "chain":
				return VanillaItemID.iron_ingot;
			case "gold":
				return VanillaItemID.gold_ingot;
			case "iron":
				return VanillaItemID.iron_ingot;
			case "diamond":
				return VanillaItemID.diamond;
		}

		return null;
	};
    IArmorMaterial.prototype.getName = function(){
		return this.name();
	};

	return IArmorMaterial;
}());

let _ItemArmor = (function(_super){
	__extends(_ItemArmor, _super);

	function _ItemArmor(nameID, armorParams, name){
		_super.call(this, nameID, armorParams, name);
		_ItemArmor.registerListeners(this.id, this);
        return this;
	};

	_ItemArmor.prototype.applyParams = function(p){
		_super.prototype.applyParams.call(this, p);
		this.setType(p.getType());
		this.setArmor(p.getArmor());
		this.setTexture(p.getTexture());
		this.setKnockbackResist(p.getKnockbackResist());
		this.setMaterial(p.getMaterial());
	};
	_ItemArmor.prototype.createItem = function(){
		return Item.createArmorItem(this.stringID, this.name, this.icon, {
			armor: this.armor,
			durability: 0,
			knockbackResist: this.knockbackResistance,
			texture: this.texture,
			type: ["helmet", "chestplate", "leggings", "boots"][this.type]
		});
	};
	_ItemArmor.registerListeners = function (id, armorFuncs) {
		if ('onHurt' in armorFuncs) {
			Armor.registerOnHurtListener(id, function (item, slot, player, type, value, attacker, bool1, bool2) {
				return armorFuncs.onHurt(new _PlayerEntity(player), slot, new Actor(attacker), new _ItemStack(item), type, value, boo1, bool2);
			});
		}
		if ('onTick' in armorFuncs) {
			Armor.registerOnTickListener(id, function (item, slot, player) {
				return armorFuncs.onTick(new _PlayerEntity(player), slot, new _ItemStack(item));
			});
		}
		if ('onTakeOn' in armorFuncs) {
			Armor.registerOnTakeOnListener(id, function (item, slot, player) {
				armorFuncs.onTakeOn(new _PlayerEntity(player), slot, new _ItemStack(item));
			});
		}
		if ('onTakeOff' in armorFuncs) {
			Armor.registerOnTakeOffListener(id, function (item, slot, player) {
				armorFuncs.onTakeOff(new _PlayerEntity(player), slot, new _ItemStack(item));
			});
		}
    };
	_ItemArmor.prototype.setMaterial = function(armorMaterial){
		if(!armorMaterial) return;
		if (typeof armorMaterial == "string") {
            armorMaterial = ItemRegistry.getArmorMaterial(armorMaterial);
        }
        this.armorMaterial = armorMaterial;
        let slot = EArmorType[this.armorType];
        let maxDamage = armorMaterial.getDurability(slot);
        this.setMaxDamage(maxDamage);
        if (armorMaterial.getEnchantability) {
            this.setEnchantType(EEnchantType[this.armorType], armorMaterial.getEnchantability());
        }
        if (armorMaterial.getRepairItem()) {
            this.addRepairItem(armorMaterial.getRepairMaterial());
        }
	};

	_getterAndSetterFunc(_ItemArmor, "type");
	_getterAndSetterFunc(_ItemArmor, "armor");
	_getterAndSetterFunc(_ItemArmor, "texture");
	_getterAndSetterFunc(_ItemArmor, "knockbackResist");

	return _ItemArmor;
}(_ItemBase));

let BlockItem = (function(_super) {
	__extends(BlockItem, _super);

	function BlockItem(nameID, blockIn, params, name) {
		_super.call(this, nameID, params, name);
		this.__block = blockIn;
		this.__block.__item = this;
		let that = this;
		Block.registerDropFunction(blockIn.id, function(coords, blockID, blockData, diggingLevel, enchant, item, region) {
			return that.getDrop(new BlockPos(coords), new AbstractBlockState(blockID, blockData), diggingLevel, enchant, new _ItemStack(item), new _WorldRegion(region));
		});
	};

	BlockItem.prototype.getBlock = function() {
		return this.__block;
	};
	BlockItem.prototype.onItemUse = function(pos, stack, state, player) {
		let region = _WorldRegion.getForActor(player);
		if (this.getBlock().placeAt(region, pos, stack.data))
			stack.decrease(1);
	};
	BlockItem.prototype.getDrop = function(coords, block, level, enchant, item, region) {
		return [[this.id, 1, block.data]];
	};

	return BlockItem;
}(_ItemBase));

let _BlockRegistry = (function(_BlockRegistry) {
	__extendsNamespace(_BlockRegistry, BlockRegistry);

	let blocks = {};

	function registerBlockFuncs(blockID, blockFuncs) {
		var numericID = Block.getNumericId(blockID);
		if ('getDrop' in blockFuncs) {
			Block.registerDropFunction(numericID, function(coords, blockID, blockData, diggingLevel, enchant, item, region) {
				return blockFuncs.getDrop(new BlockPos(coords), new AbstractBlockState(blockID, blockData), diggingLevel, enchant, new _ItemStack(item), new _WorldRegion(region));;
			});
		}
		if ('onDestroy' in blockFuncs) {
			Callback.addCallback("DestroyBlock", function(coords, block, player) {
				if (block.id == numericID) {
					blockFuncs.onDestroy(new BlockPos(coords), new AbstractBlockState(block), _WorldRegion.getForActor(player), player);
				}
			});
		}
		if ('onBreak' in blockFuncs) {
			Block.registerPopResourcesFunction(numericID, function(coords, block, region) {
				blockFuncs.onBreak(new BlockPos(coords), new AbstractBlockState(block), new _WorldRegion(region));
			});
		}
		if ('onPlace' in blockFuncs) {
			Block.registerPlaceFunction(numericID, function(coords, item, block, player, region) {
				player = new _PlayerEntity(player);
				let stack = new _ItemStack(item);
				stack.link(EStackLinkType.CARRIED_ITEM, player);
				return blockFuncs.onPlace(new BlockPos(coords), stack, new AbstractBlockState(block), player, new _WorldRegion(region));
			});
		}
		if ('onNeighbourChange' in blockFuncs) {
			Block.registerNeighbourChangeFunction(numericID, function(coords, block, changeCoords, region) {
				blockFuncs.onNeighbourChange(new BlockPos(coords), new AbstractBlockState(block), new BlockPos(changeCoords), new _WorldRegion(region));
			});
		}
		if ('onEntityInside' in blockFuncs) {
			Block.registerEntityInsideFunction(numericID, function(coords, block, entity) {
				blockFuncs.onEntityInside(new BlockPos(coords), new AbstractBlockState(block), entity);
			});
		}
		if ('onEntityStepOn' in blockFuncs) {
			Block.registerEntityInsideFunction(numericID, function(coords, block, entity) {
				blockFuncs.onEntityStepOn(new BlockPos(coords), new AbstractBlockState(block), entity);
			});
		}
		if ('onRandomTick' in blockFuncs) {
			Block.setRandomTickCallback(numericID, function(x, y, z, id, data, region) {
				blockFuncs.onRandomTick(new BlockPos(x, y, z), new AbstractBlockState(id, data), new _WorldRegion(region));
			});
		}
		if ('onAnimateTick' in blockFuncs) {
			Block.setAnimateTickCallback(numericID, function(x, y, z, id, data) {
				blockFuncs.onAnimateTick(new BlockPos(x, y, z), new AbstractBlockState(id, data));
			});
		}
		if ('onClick' in blockFuncs) {
			if (Block.registerClickFunction) {
				Block.registerClickFunction(numericID, function(coords, item, block, player) {
					player = new _PlayerEntity(player);
					let stack = new _ItemStack(item);
					stack.link(EStackLinkType.CARRIED_ITEM, player);
					blockFuncs.onClick(new BlockPos(coords), stack, new AbstractBlockState(block), player);
				});
			} else {
				Callback.addCallback("ItemUse", function(coords, item, block, isExternal, player) {
					if (block.id == numericID) {
						let stack = new _ItemStack(item);
						player= new _PlayerEntity(player);
						stack.link(EStackLinkType.CARRIED_ITEM, player);
						blockFuncs.onClick(new BlockPos(coords), stack, new AbstractBlockState(block), player);
					}
				});
			}
		}
	};
	_BlockRegistry.registerBlockFuncs = registerBlockFuncs;

	function getInstanceOf(blockID) {
		var numericID = Block.getNumericId(blockID);
		return blocks[numericID] || BlockRegistry.getInstanceOf(numericID) || null;
	};
	_BlockRegistry.getInstanceOf = getInstanceOf;

	function registerBlock(block) {
		block.createBlock();
		registerBlockFuncs(block.id, block);
		blocks[block.id] = block;
		return block;
	};
	_BlockRegistry.registerBlock = registerBlock;

	return _BlockRegistry;
}({}));

let _ItemRegistry = (function(_ItemRegistry) {
	__extendsNamespace(_ItemRegistry, ItemRegistry);

	let items = {};

	function registerItemFuncs(itemID, itemFuncs) {
		var numericID = Item.getNumericId(itemID);
		if ('onNameOverride' in itemFuncs) {
			Item.registerNameOverrideFunction(numericID, function(item, translation, name) {
				return ItemRegistry.getItemRarityColor(item.id) + itemFuncs.onNameOverride(item, translation, name);
			});
		}
		if ('onIconOverride' in itemFuncs) {
			Item.registerIconOverrideFunction(numericID, function(item, isModUi) {
				return itemFuncs.onIconOverride(item, isModUi);
			});
		}
		if ('onItemUse' in itemFuncs) {
			Item.registerUseFunction(numericID, function(coords, item, block, player) {
				player = new _PlayerEntity(player);
				let stack = new _ItemStack(item);
				stack.link(EStackLinkType.CARRIED_ITEM, player);
				itemFuncs.onItemUse(new BlockPos(coords), stack, new AbstractBlockState(block), player);
			});
		}
		if ('onNoTargetUse' in itemFuncs) {
			Item.registerNoTargetUseFunction(numericID, function(item, player) {
				player = new _PlayerEntity(player);
				let stack = new _ItemStack(item);
				stack.link(EStackLinkType.CARRIED_ITEM, player);
				itemFuncs.onNoTargetUse(stack, player);
			});
		}
		if ('onUsingReleased' in itemFuncs) {
			Item.registerUsingReleasedFunction(numericID, function(item, ticks, player) {
				player = new _PlayerEntity(player);
				let stack = new _ItemStack(item)
				stack.link(EStackLinkType.CARRIED_ITEM, player);
				itemFuncs.onUsingReleased(stack, ticks, player);
			});
		}
		if ('onUsingComplete' in itemFuncs) {
			Item.registerUsingCompleteFunction(numericID, function(item, player) {
				player = new _PlayerEntity(player);
				let stack = new _ItemStack(item);
				stack.link(EStackLinkType.CARRIED_ITEM, player);
				itemFuncs.onUsingComplete(stack, player);
			});
		}
		if ('onDispense' in itemFuncs) {
			Item.registerDispenseFunction(numericID, function(coords, item, blockSource) {
				itemFuncs.onDispense(new BlockPos(coords), new _ItemStack(item), new _WorldRegion(blockSource));
			});
		}
	};
	_ItemRegistry.registerItemFuncs = registerItemFuncs;
	
	function registerItem(itemInstance) {
		items[itemInstance.id] = itemInstance;
		itemInstance.item = itemInstance.createItem();
		registerItemFuncs(itemInstance.id, itemInstance);
		refreshItemParams(itemInstance);
		return itemInstance;
	};
	_ItemRegistry.registerItem = registerItem;

	function refreshItemParams(item){
		if(item.category) item.setCategory(item.category);
		if(item.maxStack) item.setMaxStack(item.maxStack);
		if(item.maxDamage) item.setMaxDamage(item.maxDamage);
		if(item.isHandEquipped) item.setHandEquipped(item.isHandEquipped);
		if(item.isOffhandItem) item.allowInOffHand(item.isOffhandItem);
		if(item.isLiquidClip) item.setLiquidClip(item.isLiquidClip);
		if(item.enchantType && item.enchantability) item.setEnchantType(item.enchantType, item.enchantability);
		if(item.glint) item.setGlint(item.glint);
		if(item.repairItem) item.addRepairItem(item.repairItem);
		if(item.properties) item.setProperties(item.properties);
	};
	_ItemRegistry.refreshItemParams = refreshItemParams;

	function getInstanceOf(itemID) {
		var numericID = Item.getNumericId(itemID);
		return items[numericID] || ItemRegistry.getInstanceOf(numericID) || null;
	};
	_ItemRegistry.getInstanceOf = getInstanceOf;

	return _ItemRegistry;
}({}));

let _TileEntityBase = (function(_super) {
	__extends(_TileEntityBase, _super);

	function _TileEntityBase() {
		_super.apply(this, arguments);
		return this;
	};

	_TileEntityBase.prototype.onItemClick = function(id, count, data, coords, player, extra) {
		if (!this.__initialized) {
			if (!this._runInit()) {
				return false;
			}
		}
		this._clickPrevented = false;
		player = new _PlayerEntity(player);
		let stack = new _ItemStack(id, count, data, extra);
		stack.link(EStackLinkType.CARRIED_ITEM, player);
		if (this.onItemUse(new BlockPos(coords), stack, player) || this._clickPrevented) {
			return this._clickPrevented;
		}
		if (player.getSneaking()) {
			return false;
		}
		var screenName = this.getScreenName(player, coords);
		if (screenName && this.getScreenByName("main")) {
			var client = player.getClient();
			if (client) {
				this.container.openFor(client, screenName);
				return true;
			}
		}
		return false;
	};
	_TileEntityBase.prototype.init = function() {
		this.region = new _WorldRegion(this.blockSource);
		this.onInit();
	};

	return _TileEntityBase;
}(TileEntityBase));

let _WorldRegion = (function(_super) {
	__extends(_WorldRegion, _super);

	function _WorldRegion(region) {
		if (!region) return null;
		let blockSource = __instanceOf(region, WorldRegion) ? region.blockSource : region;
		//if(!__instanceOf(blockSource, BlockSource)) throw new Error("Invalid region argument");
		_super.call(this, blockSource);
		return this;
	};

	function getForActor(entity) {
		if(__instanceOf(entity, Actor)) entity = entity.getUid();
		return new this(BlockSource.getDefaultForActor(entity));
	};
	_WorldRegion.getForActor = getForActor;

	function getForDimension(dimension) {
		return new this(BlockSource.getDefaultForDimension(dimension));
	};
	_WorldRegion.getForDimension = getForDimension;

	function getCurrentWorldGenRegion() {
		return new this(BlockSource.getCurrentWorldGenRegion());
	};
	_WorldRegion.getCurrentWorldGenRegion = getCurrentWorldGenRegion;

	_WorldRegion.prototype.getBlock = function(pos, y, z) {
		return new AbstractBlockState(_super.prototype.getBlock.call(this, pos, y, z));
	};
	_WorldRegion.prototype.getEntitiesWithinAABB = function(aabb, clazz, func, that){
		let sorted = [];
		let all = Entity.getAllInRange({x: aabb.minX + (aabb.maxX - aabb.minX) / 2, y: aabb.minY + (aabb.maxY - aabb.minY) / 2, z: aabb.minZ + (aabb.maxZ - aabb.minZ) / 2}, Math.sqrt(Math.pow(aabb.maxX - aabb.minX, 2) + Math.pow(aabb.maxY - aabb.minY, 2) + Math.pow(aabb.maxZ - aabb.minZ, 2)) / 2);//region.listEntitiesInAABB.apply(region, aabb.toArray().concat([256, true]));
		all = all.map(function(uuid){
			return EntityType.buildEntityFor(Entity.getType(uuid), uuid);
		});
		let tickable = [];
		for(let i in TickableEntity.LIST){
			let tie = TickableEntity.LIST[i];
			if(aabb.contains(tie.getPosition()))
				tickable.push(tie);
		}
		all = all.concat(tickable);
		for (let i in all) {
			let entity = all[i];
			if(!entity || !entity.isAlive() || !__instanceOf(entity, clazz) || (func && !func.call(that, entity))) continue;
			sorted.push(entity);
		}
		return sorted;
	};
	_WorldRegion.prototype.isAirBlock = function(pos){
		return !this.getBlock(pos).id;
	};
	_WorldRegion.prototype.getExtraBlock = function(pos) {
		return new AbstractBlockState(_super.prototype.getExtraBlock.call(this, pos));
	};
	_WorldRegion.prototype.addEntity = function(entity) {
		if (__instanceOf(entity, TickableEntity)){
			if(!TickableEntity.MAP[entity.getUid()]){
				TickableEntity.MAP[entity.getUid()] = entity;
				TickableEntity.LIST.push(entity);
				entity.load();
			}
			
		}
		if (__instanceOf(entity, Actor)){
			entity.setUid(Entity.spawn(entity.getPosition().x, entity.getPosition().y, entity.getPosition().z, entity.getType()));
			entity.setRegion(this);
		}
	};
	_WorldRegion.prototype.addParticle = function(type, x, y, z, vx, vy, vz){
		ParticleManager.addParticle(this.getDimension(), type, x, y, z, vx, vy, vz);
	};
	_WorldRegion.prototype.particleEffect = function(name, packet){
		ParticleManager.particleEffect(name, this.getDimension(), packet);
	};
	_WorldRegion.prototype.removeEntity = function (entity){
		entity.kill();
	};
	_WorldRegion.prototype.dropItem = function(x, y, z, id, count, data, extra){
		if(typeof x == "object")
			return this.dropItem(x.x, x.y, x.z, y, z, id, count);
		if(typeof id == "object")
			return this.dropItem(x, y, z, id.id, id.count, id.data, id.extra);
		let entityUid = this.blockSource.spawnDroppedItem(x, y, z, id, count || 1, data || 0, extra || null);
		if(entityUid) return EntityType.buildEntityFor(64, entityUid);
	};

	return _WorldRegion;
}(WorldRegion));

let ConfiguredFeature = (function() {
	function ConfiguredFeature(feature, config) {
		this.config = config;
		this.feature = feature;
	};
	ConfiguredFeature.prototype.getConfig = function() {
		return this.config;
	};
	ConfiguredFeature.prototype.generate = function(region, rand, pos, dimensionId, chunkSeed, worldSeed, dimensionSeed) {
		this.feature.generate(region, rand, pos, this.getConfig(), dimensionId, chunkSeed, worldSeed, dimensionSeed);
	};
	return ConfiguredFeature;
}());

let Feature = (function() {
	function Feature() {
		return this;
	};
	Feature.prototype.withConfig = function(config) {
		return new ConfiguredFeature(this, config);
	};
	Feature.prototype.generate = function() {};
	return Feature;
}());

let DebugObject = (function(){

	function DebugObject(obj){
		this.obj = obj;
		let header = "Debug Object";
		let screenHeight = UI.getScreenHeight();
		let windowHeight = screenHeight * 0.4;
		let windowWidth = windowHeight * 0.7;
		let xPadding = 1000 - windowWidth;
		let yPadding = 0;
		this.ui = new UI.Window({
			location: {
				x: xPadding,
				y: yPadding,
				width: windowWidth,
				height: windowHeight
			},
			drawing: [
				{
					type: "background",
					color: Color.argb(90, 0, 0, 0)
				}
			],
			elements: {
				textHeader: {
					type: "text", 
					x: 500, 
					y: yPadding + windowHeight * 0.01, 
					font: {
						color: DyeColor.PINK.getColorValue(),
						size: 15,
						alignment: UI.Font.ALIGN_CENTER
					}, 
					text: header
				},
				textInventory: {
					type: "text",
					x: xPadding + (windowHeight * 0.03),
					y: yPadding + (windowHeight * 0.03),
					font: {
						color: DyeColor.LIGHT_GRAY.getColorValue(),
						size: 10
					},
					text: JSON.stringify(this.obj, 4, 4)
				}
			}
		});
		this.ui.setInventoryNeeded(true);
		this.ui.setCloseOnBackPressed(true);
		return this;
	};

	DebugObject.prototype.display = function(){
		this.ui.open();
	};

	return DebugObject;
}());

EXPORT("__implements", __implements);
EXPORT("__instanceOf", __instanceOf);
EXPORT("__interfaceOf", __interfaceOf);
EXPORT("__enum", __enum);
EXPORT("_filedGetter", _fieldGetter);
EXPORT("_filedSetter", _fieldSetter);
EXPORT("_filedGetterAndSetter", _fieldGetterAndSetter);
EXPORT("_getterFunc", _getterFunc);
EXPORT("_setterFunc", _setterFunc);
EXPORT("_getterAndSetterFunc", _getterAndSetterFunc);
EXPORT("Interface", Interface);
EXPORT("IGrowable", IGrowable);
EXPORT("IArmorMaterial", IArmorMaterial);
EXPORT("ParticleType", ParticleType);
EXPORT("ParticleEmitter", ParticleEmitter);
EXPORT("ParticleManager", ParticleManager);
EXPORT("AbstractBlockState", AbstractBlockState);
EXPORT("BushBlock", BushBlock);
EXPORT("TickableEntity", TickableEntity);
EXPORT("EntityType", EntityType);
EXPORT("Actor", Actor);
EXPORT("ItemEntity", ItemEntity);
EXPORT("PlayerEntity", _PlayerEntity);
EXPORT("BlockItem", BlockItem)
EXPORT("ConfiguredFeature", ConfiguredFeature);
EXPORT("Feature", Feature);
EXPORT("DebugObject", DebugObject);
EXPORT("DyeColor", DyeColor);
EXPORT("EStackLinkType", EStackLinkType);
EXPORT("LevelDisplayedQueue", LevelDisplayedQueue);
EXPORT("ItemParams", ItemParams);
EXPORT("ItemArmorParams", ItemArmorParams);
EXPORT("ModelBiped", ModelBiped);
EXPORT("ModelRenderer", ModelRenderer);
EXPORT("IMultiblock", IMultiblock);
EXPORT("AbstractMultiblock", AbstractMultiblock);
EXPORT("DenseMultiblock", DenseMultiblock);
EXPORT("MultiblockRegistry", MultiblockRegistry);
EXPORT("SimulateResult", SimulateResult);
EXPORT("Rotation", Rotation);
EXPORT("AxisAlignedBB", AxisAlignedBB);
EXPORT("Vec2f", Vec2f);
EXPORT("Vec3i", Vec3i);
EXPORT("Vec3d", Vec3d);
EXPORT("BlockPos", BlockPos);
EXPORT("Direction", Direction);
EXPORT("MathHelper", MathHelper);

//BlockEngine
EXPORT("ItemStack", _ItemStack);
EXPORT("WorldRegion", _WorldRegion);
EXPORT("BlockBase", _BlockBase);
EXPORT("TileEntityBase", _TileEntityBase);
EXPORT("ItemBase", _ItemBase);
EXPORT("ItemFood", ItemFood);
EXPORT("ItemThrowable", ItemThrowable);
EXPORT("ItemArmor", _ItemArmor);
EXPORT("ItemTool", ItemTool);
EXPORT("ToolType", ToolType);
EXPORT("Side", Side);
EXPORT("ItemCategory", ItemCategory);
EXPORT("Rarity", EnumRarity);
EXPORT("MiningLevel", MiningLevel);
EXPORT("BlockEngine", BlockEngine);
EXPORT("BlockModeler", BlockModeler);
EXPORT("BlockRegistry", _BlockRegistry);
EXPORT("ItemRegistry", _ItemRegistry);
EXPORT("LiquidItemRegistry", LiquidItemRegistry);
EXPORT("EntityCustomData", EntityCustomData);
EXPORT("IDConverter", IDConverter);