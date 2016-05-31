/**
 * Created by xiaailin on 16/05/19.
 */
+function ($){
    var ToSelected = function(element,options){
        this.$element = $(element);
        this.options = $.extend({},ToSelected.DEFAULTS,options);
        this.pageno = 0;
        this.pages = 0;
        this.init();
    };

    /*导航菜单默认属性*/
    ToSelected.DEFAULTS = {
        pagination: null,
        toselected: null,
        selected: null
    };

    /*导航菜单初始化*/
    ToSelected.prototype.init = function() {
        /*生成最基本的DOM*/
        this.createDom();

        /*右侧(已选收信人)数据初始化*/
        this.sdata(this.options.selected);

        /*左侧(收信人)数据初始化*/
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
                                '<input type="text" class="cs-search" placeholder="搜索姓名"/>'+
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
    /*左侧(收信人)数据初始化*/
    ToSelected.prototype.data = function(options) {
        var $toselected = options.toselected,
            html = '';
        for (var i = 0, len = $toselected.length; i < len; i += 1) {
            html += '<li class="cs-item cs-toselected__item" pid="' +$toselected[i].id+ '" pcollege="' +$toselected[i].college+ '">'+
                        '<label>';
            //判断是否是已选中数据
            html += this.$element.find(".cs-selected__item[pid=" +$toselected[i].id+ "]").length === 1
                            ? '<input type="checkbox" checked/>' : '<input type="checkbox"/>';
            html += '<span>' +$toselected[i].name+ '</span>（<span>' +$toselected[i].sno+ '</span>）'+
                        '</label>'+
                    '</li>';
        };
        this.$element.find(".cs-toselected ul").html(html);

        $toselected.length > 0 && this.$element.find(".cs-toselected__chks").show();//左侧(收信人)不为空,显示全选按钮
        options.pagination && this.pagination(options.pagination); //设置分页
    };
    /*右侧(已选收信人)数据初始化*/
    ToSelected.prototype.sdata = function($selected) {
        var html = '';
        for (var i = 0, len = $selected.length; i < len; i += 1) {
            html += '<li class="cs-item cs-selected__item" pid="' +$selected[i].id+ '">'+
                        '<label class="cs-name">' +$selected[i].name+ '<i>(</i>' +$selected[i].sno+ '<i>)</i></label>'+
                        '<label class="cs-school">' +$selected[i].college+ '</label>'+
                        '<label class="cs-delete">删除</label>'+
                     '</li>';
        };
        this.$element.find(".cs-selected ul").html(html);
        this.pagination(this.options.pagination); //设置分页
    }
    /*分页初始化*/
    ToSelected.prototype.pagination = function(pagination) {
        this.pageno = Math.ceil(pagination.pageno);
        this.pages =  Math.ceil(pagination.total / pagination.pagesize);
        this.$element.find('.cs-toselected__pagination').remove();
        //设置分页显示
        if(this.pageno + 1 < this.pages){
            var pagehtml = '<div class="cs-toselected__pagination">'+
                                '<i class="iconfont icon-navigatebefore disabled"></i>'+
                                '<input type="text" value="' +(this.pageno + 1)+ '"/>'+
                                '<span>/&nbsp;&nbsp;' +this.pages+ '</span>'+
                                '<i class="iconfont icon-navigatenext"></i>'+
                            '</div>';
            this.$element.find(".cs-ft").append(pagehtml);
        }
    };
    /*返回结果*/
    ToSelected.prototype.getData = function() {
        var options = $(".cs-selected ul li");
        var arr = [];
        for (var i=0, len=options.length; i < len; i+=1) {
            arr.push($(options[i]).attr("pid"));
        };
        return arr;
    };
    /*事件初始化*/
    ToSelected.prototype.initEvent = function() {
        var self = this;
        /*单选*/
        this.$element.on('click', '.cs-toselected__item input[type="checkbox"]', function(){
            $(this).is(":checked") ? appendhtml($(this)) : removehtml($(this)) ;
            chkAll();
        });
        /*删除已选收信人*/
        this.$element.on('click', '.cs-delete', function(){
            removehtml($(this));
            chkAll();
        });
        /*搜索*/
        this.$element.on('click', '.icon-sousuo', function(){
            onSearch($(this).next());
        });
        //文本框回车
        this.$element.on('keyup','.cs-search',function(event){
            onSearch($(this));
            /*if (event.keyCode == "13") {//keyCode=13是回车键
                onSearch($(this));
             }*/
        });
        function onSearch(obj){
            if($.trim($(obj).val()) !== ''){
                self.options.onSearch.call(self, $(obj).val());
            }
        }
        //全选
        this.$element.on('click', '.cs-chkall', function(){
            if($(this).is(":checked")){
                self.$element.find(".cs-toselected__item input[type='checkbox']").each(function(){
                    var $pid = $(this).parents("li").attr("pid"); //当前pid
                    self.$element.find(".cs-selected__item[pid="+$pid+"]").length === 0 && appendhtml($(this)); //不存在则添加
                });
                //checkbox全部选中
                $(".cs-toselected__item").find("input[type='checkbox']").prop("checked", true);
            }else{
                self.$element.find(".cs-toselected__item input[type='checkbox']").each(function(){
                    var $pid = $(this).parents("li").attr("pid"); //当前pid 
                    self.$element.find(".cs-selected__item[pid="+$pid+"]").length === 1 && removehtml($(this)); //存在则移除
                });
                //checkbox全部取消选中
                $(".cs-toselected__item").find("input[type='checkbox']").prop("checked", false);
            }
        });
        /*分页 下一页*/
        this.$element.on('click', '.icon-navigatenext', function(){
            if($(this).hasClass("disabled")) return; //最后页不可点
            self.pageno = self.pageno + 1;  //更新当前页
            self.$element.find(".cs-toselected__pagination input").val(self.pageno + 1); //给文本框赋值
            
            //删除上一页的上不可点效果
            self.$element.find(".cs-toselected__pagination .icon-navigatebefore").removeClass("disabled");  
            if(self.pageno + 1 === self.pages) $(this).addClass("disabled");  //给最后一页加上不可点效果
            self.options.topage.call(self, self.pageno);
        });
        /*分页 上一页*/
        this.$element.on('click', '.icon-navigatebefore', function(){
            if($(this).hasClass("disabled")) return; //第一页不可点
            self.pageno = self.pageno - 1;  //更新当前页
            self.$element.find(".cs-toselected__pagination input").val(self.pageno + 1); //给文本框赋值

            //删除下一页的上不可点效果
            self.$element.find(".cs-toselected__pagination .icon-navigatenext").removeClass("disabled");  
            if(self.pageno === 0) $(this).addClass("disabled");  //给上一页加上不可点效果
            self.options.topage.call(self, self.pageno);
        });
        //添加条目
        function appendhtml(elm){
            var $this = elm.parent(),
                html = '<li class="cs-item cs-selected__item" pid="'+$this.parent().attr("pid")+'">'+
                            '<label class="cs-name">'+$this.text()+'</label>'+
                            '<label class="cs-pcollege">'+$this.parent().attr("pcollege")+'</label>'+
                            '<label class="cs-delete">删除</label>'+
                        '</li>';
            self.$element.find(".cs-selected .cs-bd").append(html); //将条目自动添加到右侧(已选收信人)中
        }
        //删除条目
        function removehtml(elm){
            var $pid = elm.parents("li").attr("pid");
            self.$element.find(".cs-selected__item[pid="+$pid+"]").remove(); //移除删除的条目
            self.$element.find(".cs-toselected__item[pid="+$pid+"]").find("input").prop("checked", false); //取消checkbox选中
        }
        //是否全选
        function chkAll(){
            var $chklen = self.$element.find(".cs-toselected__item input[type='checkbox']:checked");  //选中个数
            var $len = self.$element.find(".cs-toselected__item input[type='checkbox']");  //总个数
            if($chklen.length === $len.length){
                self.$element.find(".cs-chkall").prop("checked", true);
            }else{
                self.$element.find(".cs-chkall").prop("checked", false);
            }
        }
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
