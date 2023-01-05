export const drawRect = (detections, ctx) =>
{
    detections.forEach(predction =>
    {
        const [x, y, width, height] = predction['bbox']
        const text = predction['class']
        const detecLevel = predction['score']
        const percentDetectLevel = Math.round(detecLevel * 100) + ` %`

        const color = "#" + Math.floor(Math.random() * 16777215).toString(16)
        ctx.strokeStyle = color
        ctx.font = "25px Rajdhani"
        ctx.fillStyle = color

        ctx.beginPath()
        ctx.fillText(text, (x + 5), (y - 55))
        ctx.fillText(detecLevel, (x + 5), (y - 32))
        ctx.fillText(percentDetectLevel, (x + 5), (y - 10))
        ctx.rect(x, y, width, height)
        ctx.stroke()
    })
}