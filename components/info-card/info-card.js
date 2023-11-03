Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: {
            type: Object,
            value: {
                name: '',
                cover: '',
                intro: ''
            }
        },
        tag: {
            type:Boolean,
            value:false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    attached: function() {
        
    },

    options: {
        multipleSlots: true, //开启多slot
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
       
    }
})