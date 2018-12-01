const c1 = document.createElement('canvas')
const c2 = document.createElement('canvas')
c1.id = 'watermark'
c1.width = '160'
c1.height = '100'
c1.style = "display: none"
c2.id = 'repeat-watermark'
c2.style = 'position:fixed;top:0;z-index:-1;background:#fff'
// c2.style = 'position:fixed;top:0;z-index:-1;background:#fff'

const Watermark = function(container, options) {
    let self = this
    const h = window.innerHeight || document.documentElement.clientHeight
    const w = window.innerWidth || document.documentElement.clientWidth
    self.opt = {
        docWidth: w,
        docHeight: h,
        fontStyle: "20px ����", //ˮӡ��������
        rotateAngle: -20 * Math.PI / 180, //ˮӡ������б�Ƕ�����
        fontColor: "rgba(100, 100, 100, 0.1)", //ˮӡ������ɫ����
        firstLinePositionX: -20, //canvas��һ��������ʼX����
        firstLinePositionY: 80, //Y
        SecondLinePositionX: 0, //canvas�ڶ���������ʼX����
        SecondLinePositionY: 70, //Y
        watermark: 'ˮӡ'
        
    }
    Object.assign(self.opt, options)
    self.render(container)
    self.draw(self.opt.docWidth, self.opt.docHeight)
    self.events()
}

Watermark.prototype = {
    render: function(d) {
        let self = this
        d.append(c1, c2)
    },

    draw: function(docWidth, docHeight) {
        let self = this
        let cw = document.getElementById('watermark')
        let crw = document.getElementById('repeat-watermark')

        crw.width = docWidth
        crw.height = docHeight

        let ctx = cw.getContext("2d")
        //���С����
        ctx.clearRect(0, 0, 160, 100)
        ctx.font = self.opt.fontStyle
        //������б�Ƕ�
        ctx.rotate(self.opt.rotateAngle)

        ctx.fillStyle = self.opt.fontColor
        //��һ������
        ctx.fillText(self.opt.watermark, self.opt.firstLinePositionX, self.opt.firstLinePositionY)
        //�ڶ������� 
        //ctx.fillText(window.watermark.mobile, self.opt.SecondLinePositionX, self.opt.SecondLinePositionY)
        //����ϵ��ԭ
        ctx.rotate(-self.opt.rotateAngle)

        let ctxr = crw.getContext("2d")
        //�����������
        ctxr.clearRect(0, 0, crw.width, crw.height)
        //ƽ��--�ظ�С���canvas
        let pat = ctxr.createPattern(cw, "repeat")
        ctxr.fillStyle = pat

        ctxr.fillRect(0, 0, crw.width, crw.height)
    },
    events: function() {
        let self = this
        window.addEventListener('resize', function() {
          const h = window.innerHeight || document.documentElement.clientHeight
          const w = window.innerWidth || document.documentElement.clientWidth
          self.draw(w, h)
        })
    }
}

export default Watermark