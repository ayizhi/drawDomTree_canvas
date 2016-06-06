/**
 * Created by zhangyizhi on 16/6/5.
 */

var TreeData = {
    "status": true,
    "message": "获取数据成功",
    "data": {
        "departmentStructure": {
            "id": "d461b77bc762411e8ca7d886e796ea5c",
            "admin_id": "0",
            "admin_name": "",
            "name": "中国移动1",
            "parent_id": "0",
            "employee_count": 18,
            "children_ids": [
                "50acb522701848488f726a3d7cb3dc9a",
                "7b84d91891de464e807d50bb0ad7619c"
            ],
            "children": [
                {
                    "id": "50acb522701848488f726a3d7cb3dc9a",
                    "admin_id": "0",
                    "admin_name": "",
                    "name": "研发",
                    "parent_id": "d461b77bc762411e8ca7d886e796ea5c",
                    "employee_count": 1,
                    "children_ids": [
                        "7ffceb278dae4ab69d28b208f663a8ff"
                    ],
                    "children": [
                        {
                            "children": [
                                {
                                    "id": "ae627ddfa006473a93574bcc322e4dad",
                                    "admin_id": "0",
                                    "admin_name": "",
                                    "name": "那几句话关键是",
                                    "parent_id": "7ffceb278dae4ab69d28b208f663a8ff",
                                    "employee_count": 2,
                                    "children_ids": [
                                        "0db513c2c18d4be6a4e97cbb3dc5c554",
                                        "0db513c2c18d4be6a4e97cbb3dc5c551"
                                    ],
                                    "children": [
                                        {
                                            "id": "0db513c2c18d4be6a4e97cbb3dc5c554",
                                            "admin_id": "0",
                                            "admin_name": "",
                                            "name": "二二",
                                            "parent_id": "ae627ddfa006473a93574bcc322e4dad",
                                            "employee_count": 0,
                                            "children_ids": []
                                        },
                                        {
                                            "id": "0db513c2c18d4be6a4e97cbb3dc5c551",
                                            "admin_id": "0",
                                            "admin_name": "",
                                            "name": "一一",
                                            "parent_id": "ae627ddfa006473a93574bcc322e4dad",
                                            "employee_count": 0,
                                            "children_ids": []
                                        }
                                    ]
                                }
                            ],
                            "id": "7ffceb278dae4ab69d28b208f663a8ff",
                            "admin_id": "0",
                            "admin_name": "",
                            "name": "研发1",
                            "parent_id": "50acb522701848488f726a3d7cb3dc9a",
                            "employee_count": 0,
                            "children_ids": [
                                "ae627ddfa006473a93574bcc322e4dad"
                            ]
                        }
                    ]
                },
                {
                    "id": "7b84d91891de464e807d50bb0ad7619c",
                    "admin_id": "0",
                    "admin_name": "",
                    "name": "测试一部",
                    "parent_id": "d461b77bc762411e8ca7d886e796ea5c",
                    "employee_count": 1,
                    "children_ids": ['ae627ddfa006473a93574bcc322e4daas'],
                    "children": [
                        {
                            "children": [
                                {
                                    "id": "ae627ddfa006473a93574bcc322e4dasfds",
                                    "admin_id": "0",
                                    "admin_name": "",
                                    "name": "那几句话关键是1",
                                    "parent_id": "7b84d91891de464e807d50bb0ad7619c",
                                    "employee_count": 2,
                                    "children_ids": [
                                        "0db513c2c18d4be6a4e97cbb3dc5c5342",
                                        "0db513c2c18d4be6a4e97cbb3dc5c4521"
                                    ],
                                    "children": [
                                        {
                                            "id": "0db513c2c18d4be6a4e97cbb3dc5c5342",
                                            "admin_id": "0",
                                            "admin_name": "",
                                            "name": "三三",
                                            "parent_id": "ae627ddfa006473a93574bcc322e4dasfds",
                                            "employee_count": 0,
                                            "children_ids": []
                                        },
                                        {
                                            "id": "0db513c2c18d4be6a4e97cbb3dc5c4521",
                                            "admin_id": "0",
                                            "admin_name": "",
                                            "name": "四四",
                                            "parent_id": "ae627ddfa006473a93574bcc322e4dasfds",
                                            "employee_count": 0,
                                            "children_ids": []
                                        }
                                    ]
                                }
                            ],
                            "id": "7ffceb278dae4ab69d28b208f663a8ff",
                            "admin_id": "0",
                            "admin_name": "",
                            "name": "研发1",
                            "parent_id": "50acb522701848488f726a3d7cb3dc9a",
                            "employee_count": 0,
                            "children_ids": [
                                "ae627ddfa006473a93574bcc322e4dad"
                            ]
                        }
                    ]

                }
            ]
        },
        "leftEmployeeCount": 14
    }
}




//画tree的控制器
function DrawDomTreeController(id){
    var t = this;
    t.canvasBox = document.getElementById(id);
    t.ctx = t.canvasBox.getContext('2d');
    t.baseLen = 20;

    t.addNew = false;//用来控制是否新添加了树枝,true代表是,false代表否
    t.controller = {};


    t.drawAnimate();


}

DrawDomTreeController.prototype =  {
    //动画控制器
    drawAnimate: function (){
        var t = this;
        var raf = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function (callback){window.setTimeout(callback, 17);};

        function ani(){
            //画
            for(var key in t.controller){
                var thisPart = t.controller[key];
                thisPart.drawSelf();
            }

            raf(ani);
        }

        ani();
    },

    //处理数据的控件
    dealWithDomData: function (data) {
        var t = this;
        var baseY = 0;//树结构纵坐标
        var baseX = 0;//树结构横坐标
        t.controller = {};//controller状态还原

        iterator(data.data.departmentStructure,baseY,baseX)

        function iterator(data,baseY,baseX){
            var name = data['name']
            var id = data['id']
            var childern = data['children'];

            //将坐标装入
            data.baseX = baseX;
            data.baseY = baseY;
            data.ctx = t.ctx;
            data.baseLen = t.baseLen

            t._pushInto(new DrawSinglePart(data));

            if(childern){
                baseY = baseY + 1//只在for循环内维度加一
                //baseX = 0
                for(var i= 0,len=childern.length;i<len;i++){
                    if(i>0){
                        baseX += 1
                    }
                    iterator(childern[i],baseY,baseX)
                }
            }else{
                return
            }
        }

        //对横坐标进行重新计算
        for(var key in t.controller){
            var thisPart = t.controller[key];
            var thisId = thisPart.id;
            var childrenId = thisPart.children_ids;
            //console.log(thisPart.name,thisPart.baseX)
            for(var i= 0,len=childrenId.length;i<len;i++){
                if(t.controller[childrenId[i]]){
                    t.controller[childrenId[i]].baseX += t.controller[thisId].baseX;
                    console.log(t.controller[childrenId[i]].name, t.controller[childrenId[i]].baseX);

                }
            }
        }


    },


    //push到controller
    _pushInto: function (obj) {
        var t = this;
        t.controller[obj['id']] = obj;
    }
}



//画每个小枝条(由上面的一条竖线与下面的一个方块组成)
function DrawSinglePart(obj){
    var baseLen = obj['baseLen'];
    var t = this;
    //画图信息
    t.width = 6 * baseLen;
    t.height = 3 * baseLen;
    t.baseX = obj['baseX'] * 4 * baseLen + 100;//竖线开始的位置
    t.baseY = obj['baseY'] * 4 * baseLen + 20;
    t.endX = t.baseX;//竖线结束的位置
    t.endY = +t.baseY + 4 * baseLen;
    t.contentTopR_x = t.endX - 1/2 * t.width;//方块(主要内容)左上角坐标
    t.contentTopR_y = t.endY;

    //基本信息
    t.id = obj['id'];
    t.admin_id = obj['admin_id'];
    t.admin_name = obj["admin_name"];
    t.name = obj['name'];
    t.parent_id = obj['parent_id'];
    t.employee_count = obj['employee_count'];
    t.children_ids = obj['children_ids'];
    t.children = obj['children'];

    //画布
    t.paCtx = obj['ctx'];

    t.init();
}

DrawSinglePart.prototype = {
    init: function (){},

    drawSelf: function () {
        var t = this;
        var paCtx = t.paCtx;

        //content上方竖线
        paCtx.beginPath();
        paCtx.lineWidth="5";
        paCtx.strokeStyle="#ccc"; // 红色路径
        paCtx.moveTo(t.baseX, t.baseY);
        paCtx.lineTo(t.endX, t.endY);
        paCtx.stroke(); // 进行绘制


    }
}


var theController = new DrawDomTreeController('dom-tree-canvas')
theController.dealWithDomData(TreeData)
