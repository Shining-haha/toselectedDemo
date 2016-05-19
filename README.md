# toselectedDemo

收信人组件需求清单：


左侧(收信人)：

1、初始化页面，加载收信人和已选收信人的数据信息，注意:右侧(已选收信人)数据相对应的左侧(收信人)数据的checkbox为选中状态；

   请求数据：默认第一页、每页条数(固定参数)
   接收数据：收信人和已选收信人数据
   
2、分页处理，左侧(收信人)数据更新，注意:右侧(已选收信人)数据相对应的左侧(收信人)数据的checkbox为选中状态；

   请求数据：当前页码、每页条数(固定参数)
   接收数据：人员列表数据、总条数

3、页面中的checkbox的选中或取消和右侧数据的删除等操作是不与后台交互处理的；
   左侧(收信人)点击选中(checkbox变为已选效果)，右侧(已选收信人)自动添加条目信息；
   左侧(收信人)取消选中(checkbox变为未选效果)，右侧(已选收信人)自动删除该条目；
   左侧(收信人)点击全选(所有checkbox变为已选效果)，右侧(已选收信人)自动添加当前选中的所有条目信息；
   左侧(收信人)取消全选(所有checkbox变为未选效果)，右侧(已选收信人)自动删除所有全校选中的条目信息；

4、输入搜索内容，键盘弹起或者回车查询；
   左侧(收信人)数据更新，注意:右侧(已选收信人)数据相对应的左侧(收信人)数据的checkbox为选中状态；

   请求数据：搜索内容、当前页(不传默认第一页)、每页条数(固定参数)
   接收数据：收信人数据


右侧(已选收信人)

1、已选收信人条目，鼠标hover状态下，显示删除按钮；

2、点击删除，右侧(已选收信人)该条目删除，左侧(收信人)该条目则取消选中(checkbox变为未选效果)；


组件：

1、getData()方法中则把已选条目的数据保存为一个json数组里输出；



