//plotting the data directly
let dataPlot = (arr) => {
    arr.map((x,i)=>{
        ctx.fillStyle = "#ccc";
        ctx.beginPath();
        ctx.arc(x_o + x[0]*scaleX,y_o - x[1]*scaleY,3,0,2*Math.PI);
        ctx.fill();
    })
}

//plotting the curve, y = f(x)

let curve_plot = (y) => (x_in) => (x_fin) => (dx) => {
    if(x_in >= x_fin)
    {
    ctx.arc(x_o + x_in*scaleX, y_o - y(x_in)*scaleY,1,0,2*Math.PI);
    ctx.fill();
    }
    else
    {
    ctx.beginPath();
    ctx.moveTo(x_o + x_in*scaleX, y_o - y(x_in)*scaleY);
    ctx.lineTo(x_o + x_in*scaleX + dx*scaleX, y_o - y(x_in + dx)*scaleY);
    ctx.stroke();
    return curve_plot(y)(x_in + dx)(x_fin)(dx);
    }
}

//plotting the curve y =f(t), x = g(t)

let parametric_curve = (y) => (x) => (t_in) => (t_fin) => (dt) => 
    {
    if(t_in >= t_fin)
    {
    ctx.arc(x_o + x(t_in)*scaleX, y_o - y(t_in)*scaleY,2,0,2*Math.PI);
    ctx.fill();
    }
    else
    {
    ctx.beginPath();
    ctx.moveTo(x_o + x(t_in)*scaleX, y_o - y(t_in)*scaleY);
    ctx.lineTo(x_o + x(t_in + dt)*scaleX, y_o - y(t_in + dt)*scaleY);
    ctx.stroke();
    
    return parametric_curve(y)(x)(t_in + dt)(t_fin)(dt);
    }
}