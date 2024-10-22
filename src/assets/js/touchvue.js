import Vue from 'vue'  
//引入外部js  
import './hammer.js'  
  
  
function vueTouch(el,type,binding){  
    this.el = el;  
    this.type = type;  
    this.binding = binding;  
    //直接调用  
    var hammertime = new Hammer(this.el);  
    hammertime.on(this.type,this.binding.value);  
};  
  
//包装成指令  
const tap = Vue.directive("tap",{  
    bind:function(el,binding){  
        new vueTouch(el,"tap",binding);  
    }  
});  
  
const swipeleft = Vue.directive("swipeleft",{  
    bind:function(el,binding){  
        new vueTouch(el,"swipeleft",binding);  
    }  
});  
  
const swiperight = Vue.directive("swiperight",{  
    bind:function(el,binding){  
        new vueTouch(el,"swiperight",binding);  
    }  
});  
  
const press = Vue.directive("press",{  
    bind:function(el,binding){  
        new vueTouch(el,"press",binding);  
    }  
});
const panstart = Vue.directive("panstart",{  
    bind:function(el,binding){  
        new vueTouch(el,"panstart",binding);  
    }  
});
const panmove = Vue.directive("panmove",{  
    bind:function(el,binding){  
        new vueTouch(el,"panmove",binding);  
    }  
}); 
const panend = Vue.directive("panend",{  
    bind:function(el,binding){  
        new vueTouch(el,"panend",binding);  
    }  
});     
  
//导出需要的指令  
export{tap,swipeleft,swiperight,press,panstart,panmove,panend}  