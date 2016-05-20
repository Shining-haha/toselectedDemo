/**
 * Created by xiaailin on 16/05/19.
 */
+function ($){
    var ToSelected = function(element,options){
        this.$element = $(element);
        this.options = $.extend({},ToSelected.DEFAULTS,options);
        console.log(this.options);
        this.$pageno = this.options.pagination.pageno;
        this.$pages =  Math.ceil(this.options.pagination.total / this.options.pagination.pagesize);
        this.init();
    };

    /*导航菜单默认属性*/
    ToSelected.DEFAULTS = {
        pagination:{
            total: 0,
            pageno: 0,
            pagesize: 10,
        },
        toselected: null,
        selected: null,
    };

    /*导航菜单初始化*/
    ToSelected.prototype.init = function() {
        /*生成最基本的DOM*/
        this.createDom();

        /*数据初始化*/
        this.data(this.options);

        /*事件初始化*/
        this.initEvent();
    };
    /*DOM化*/
    ToSelected.prototype.createDom = function() {
        var html =  '<div class="cs-box">'+
                        '<div class="cs-toselected">'+
                            '<div class="cs-hd">'+
                                '<i class="iconfont icon-sousuo"></i>'+
                                '<input type="text" placeholder="搜索姓名"/>'+
                            '</div>'+
                            '<ul class="cs-bd"></ul>'+
                            '<div class="cs-ft">'+
                                '<div class="cs-toselected__chks">'+
                                    '<label><input type="checkbox" class="cs-chkall"/><span>全选</span></label>'+
                                '</div>'+
                            '</div>'+
                            '<span class="cs-arrow"></span>'+
                        '</div>'+
                        '<div class="cs-selected">'+
                            '<div class="cs-hd">'+
                                '<label>已选收信人</label>'+
                            '</div>'+
                            '<ul class="cs-bd"></ul>'+
                        '</div>'+
                    '</div>';
        this.$element.html(html);
    };
    /*数据初始化*/
    ToSelected.prototype.data = function(options) {
        var $toselected = options.toselected,
            $selected = options.selected,
            html = '',shtml = '';

        //左侧(收信人)不为空,显示全选按钮
        $toselected.length > 0 && this.$element.find(".cs-toselected__chks").show();

        //左侧(收信人)数据初始化
        for (var i = 0, len = $toselected.length; i < len; i += 1) {
            html += '<li class="cs-item cs-toselected__item" pid="' +$toselected[i].id+ '" pcollege="' +$toselected[i].college+ '">'+
                        '<label>'+
                            '<input type="checkbox"/>'+
                            '<span>' +$toselected[i].name+ '</span><i>(</i><span>' +$toselected[i].sno+ '</span><i>)</i>'+
                        '</label>'+
                    '</li>';
        };
        this.$element.find(".cs-toselected ul").html(html);

        //右侧(已选收信人)数据初始化
        for (var i = 0, len = $selected.length; i < len; i += 1) {
            shtml += '<li class="cs-item cs-selected__item" pid="' +$selected[i].id+ '">'+
                        '<label class="cs-name">' +$selected[i].name+ '<i>(</i>' +$selected[i].sno+ '<i>)</i></label>'+
                        '<label class="cs-school">' +$selected[i].college+ '</label>'+
                        '<label class="cs-delete" style="display: none;">删除</label>'+
                     '</li>';
        };
        this.$element.find(".cs-selected ul").html(shtml);
        this.pagination();
    };
    /*分页初始化*/
    ToSelected.prototype.pagination = function() {
        //设置分页显示
        //console.log(this.$pageno +'--'+ this.$pages);
        if(this.$pageno + 1 < this.$pages){
            var pagehtml = '<div class="cs-toselected__pagination">'+
                                '<i class="iconfont icon-navigatebefore nodata"></i>'+
                                '<input type="text" value="' +(this.$pageno + 1)+ '"/>'+
                                '<span>/&nbsp;&nbsp;' +this.$pages+ '</span>'+
                                '<i class="iconfont icon-navigatenext"></i>'+
                            '</div>';
            this.$element.find(".cs-ft").append(pagehtml);
        }
    };

    /*事件初始化*/
    ToSelected.prototype.initEvent = function() {
        var self = this;
    };

    function Plugin(option){
        var args = Array.prototype.slice.call(arguments, 1);
        var returnValue = this;
        this.each(function(){
            var $this = $(this),
                data = $this.data('mg.toselected'),
                options = typeof option === 'object' && option;

            if(!data){
                $this.data('mg.toselected',(data = new ToSelected(this,options)));
            }

            if(typeof option === 'string'){
                returnValue = data[option].apply(data, args) || returnValue;
            }
        });
        return returnValue;
    }

    var old = $.fn.toselected;

    $.fn.toselected = Plugin;
    $.fn.toselected.Constructor = ToSelected;

    $.fn.toselected.noConflict = function(){
        $.fn.toselected = old;
        return this;
    }
}(jQuery);