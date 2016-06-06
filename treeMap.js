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
                                        "0db513c2c18d4be6a4e97cbb3dc5c554"
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
                    "children_ids": []
                }
            ]
        },
        "leftEmployeeCount": 14
    }
}

getDomTree(TreeData)

function getDomTree(TreeData){

    iterator(TreeData.data.departmentStructure)



    function iterator(data){
        var name = data['name']
        var id = data['id']
        console.log(id,name)
        var childern = data['children'];
        console.log(childern);
        if(childern){
            for(var i= 0,len=childern.length;i<len;i++){
                iterator(childern[i])
            }
        }else{
            return
        }


    }

}


var theController = new DrawDomTreeController('dom-tree-canvas')


//画tree的控制器
function DrawDomTreeController(id){
    var t = this;
    t.canvasBox = document.getElementById(id);
    t.ctx = t.canvasBox.getContext('2d');



    t.start();


}

DrawDomTreeController.prototype =  {
    start: function (){
        var t = this;
        var raf = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function (callback){window.setTimeout(callback, 17);};

        function ani(){

            raf(ani);
        }

        ani();
    }
}



//画每个小枝条(由上面的一条竖线与下面的一个方块组成)
function DrawSinglePart(obj){
    var baseLen = obj['baseLen'];
    var t = this;
    t.width = 6 * baseLen;
    t.height = 3 * baseLen;
    t.startX = obj['startX'];
    t.startY = obj['startY'];
    t.endX = t.startX;
    t.endY = +t.startY + +baseLen;
    t.contentTopR_x = t.endX - 1/2 * t.width;
    t.contentTopR_y = t.endY
}


