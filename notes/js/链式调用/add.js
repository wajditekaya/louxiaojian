      function add(name, fn, config) {
            var self = this, mods = self.Env.mods, mod, o;

            // S.add(name, config) => S.add( { name: config } )
            if (S.isString(name) && !config && S.isPlainObject(fn)) {
                o = { };
                o[name] = fn;
                name = o;
            }

            // S.add( { name: config } )
            if (S.isPlainObject(name)) {
                S.each(name, function(v, k) {
                    v.name = k;
                    if (mods[k]) mix(v, mods[k], false); // 保留之前添加的配置
                });
                mix(mods, name);
            }
            // S.add(name[, fn[, config]])
            else {
                config = config || { };

                mod = mods[name] || { };
                name = config.host || mod.host || name;
                mod = mods[name] || { };

                // 注意：通过 S.add(name[, fn[, config]]) 注册的代码，无论是页面中的代码，还
                //      是 js 文件里的代码，add 执行时，都意味着该模块已经 LOADED
                mix(mod, { name: name, status: LOADED });
                if (!mod.fns) mod.fns = [];
                fn && mod.fns.push(fn);
                mix((mods[name] = mod), config);

                // 对于 requires 都已 attached 的模块，比如 core 中的模块，直接 attach
                if ((mod['attach'] !== false) && self.__isAttached(mod.requires)) {
                    self.__attachMod(mod);
                }
            }

            return self;
    };

    mix(S, {

        /**
         * The version of the library.
         * @type {String}
         */
        version: '1.1.5',

        /**
         * Initializes KISSY object.
         */
        __init: function() {
            // 环境信息
            this.Env = {
                mods: { }, // 所有模块列表
                _loadQueue: { } // 加载的模块信息
            };

            // 从当前引用文件路径中提取 base
            var scripts = doc.getElementsByTagName('script'),
                currentScript = scripts[scripts.length - 1],
                base = currentScript.src.replace(/^(.*)(seed|kissy).*$/i, '$1');
            
            // 配置信息
            this.Config = {
                debug: '@DEBUG@', // build 时，会将 @DEBUG@ 替换为空
                base: base,
                timeout: 10   // getScript 的默认 timeout 时间
            };
        }
	 }
	 
   )
