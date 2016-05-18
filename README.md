# toselectedDemo

收信人组件需求清单：

左侧(收信人)：

1、页面第一页数据显示，分页显示；
   请求数据：当前页(不传默认第一页)、每页条数(固定参数)
   接收数据：人员列表数据、总条数
   
2、下一页，数据刷新；
   请求数据：当前页、每页条数(固定参数)
   接收数据：人员列表数据、总条数

3、点击选中(checkbox变为已选效果)，右侧(已选收信人)自动添加条目信息；
   取消选中(checkbox变为未选效果)，右侧(已选收信人)自动删除该条目；
   点击全选(所有checkbox变为已选效果)，右侧(已选收信人)自动添加当前选中的所有条目信息；
   取消全选(所有checkbox变为未选效果)，右侧(已选收信人)自动删除所有全校选中的条目信息；

4、输入搜索内容，键盘弹起或者回车查询 左侧数据刷新；
   请求数据：搜索内容、当前页(不传默认第一页)、每页条数(固定参数)
   接收数据：人员列表数据、总条数

右侧(已选收信人)

1、已选收信人条目，鼠标hover状态下，显示删除按钮；

2、点击删除，右侧(已选收信人)该条目删除，左侧(收信人)该条目则取消选中(checkbox变为未选效果)；

【把已选条目的数据保存为一个json数组里】
