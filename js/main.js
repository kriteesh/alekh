const canvas = document.querySelector('canvas');
let w = canvas.width = document.getElementsByClassName('simulation')[0].clientWidth;
let h = canvas.height = document.getElementsByClassName('simulation')[0].clientHeight;


let ctx = canvas.getContext('2d');
let showNumbers = true;
let origin = {x:14,y:11};
let scale = {x:1,y:1};

    let x_o = origin.x*w/30;
    let y_o = origin.y*h/20;
    let scaleX = (w/30)/scale.x;
    let scaleY = (h/20)/scale.y;
    let mean =10;
    let sigma = 2;

    let background = () =>{
        ctx.fillStyle = "#131313";
        ctx.fillRect(0,0,w,h);
    }

    let grid = (scale) =>(origin) =>{
      ctx.fillStyle = "#ccc";
      ctx.strokeStyle = "#ccc";
      ctx.beginPath();
      ctx.moveTo(origin.x* w / 30,0);
      ctx.lineTo(origin.x* w / 30,h);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0,origin.y* h / 20);
      ctx.lineTo(w,origin.y* h / 20);
      ctx.stroke();
      
      let tickX = new Array(30).fill(1).map((x,i)=>
      {
            ctx.beginPath();
            ctx.moveTo(i * w / 30, y_o - 2);
            ctx.lineTo(i * w / 30, y_o + 2);
            ctx.stroke();
            if(showNumbers)
            {
                ctx.font = "9px Arial";
                ctx.fillText(scale.x*(i - origin.x),i * w / 30, y_o + 10);
            }

      }
      );

     let tickY = new Array(20).fill(1).map((x,i)=>
      {
            ctx.beginPath();
            ctx.moveTo(x_o - 2, i * h / 20);
            ctx.lineTo(x_o + 2, i * h / 20);
            ctx.stroke();
            if((showNumbers)&&(i!=origin.y))
            {
                ctx.font = "9px Arial";
                ctx.fillText((-(i - origin.y)*scale.y).toFixed(2),x_o - 20, i * h / 20 + 5);
            }

      }
      );

    }

    // background();
    
    let program = {
        title : "Normal Distribution",
        defaultInfo : "This is the most general curve of all",
        
        parameters : [
            {
                name : "x-scale",
                range : [1,10],
                default : 1,
                info : "You have just changed the scale of x-axis. Increasing the value of this scale would make the graph appear thinner, though the actual shape of the graph is not changing at all."
            },
            {
                name : "y-scale",
                range : [1,40],
                default : 20,
                info : "You have just changed the scale of y-axis. Increasing the value of this scale would make the graph appear elongated, though the actual shape of the graph is not changing at all."
            },
            {
                name : "mean",
                range : [-15,15],
                default : 10,
                info : "Mean is the average value of the distribution. In this graph, the mean is the middle point of graph. Increasing the value of mean, shifts the graph to the right side on the x-axis"
            },
            {
                name : "sigma",
                range : [1,15],
                default : 2,
                info : "Sigma is the standard deviation of the deviation. In this graph, the standard deviation is the "
            },
            {
                name : "kurt",
                range : [1,15],
                default : 2,
                info : "changing the kurt is the thing"
            }
        ],
        curve : () => {curve_plot(x=>Math.sin(x))(-12*Math.PI)(12*Math.PI)(0.01);}  
    }


    let kurt = 2; 

    grid(scale)(origin);
    program.curve();
    // curve_plot(x=>1/sigma * 1/Math.sqrt(2*Math.PI)*Math.exp(-(x-mean)*(x-mean)/(kurt*sigma*sigma)))(-12*Math.PI)(12*Math.PI)(0.01);
    // curve_plot(x=>Math.sin(x))(-12*Math.PI)(12*Math.PI)(0.01);
    // curve_plot(x=>Math.sinh(x))(-12*Math.PI)(12*Math.PI)(0.01);
    // curve_plot(x=>Math.asin(x))(-12*Math.PI)(12*Math.PI)(0.01);
    // let data = new Array(48).fill(1);
    // data = data.map((x,i)=>[24-i,(24-i)*(24-i)]);
    // dataPlot(data);

    let title = document.getElementsByClassName('title')[0];
    title.innerText = program.title;

    let info = document.getElementsByClassName('infoBox')[0];
    info.innerText = program.defaultInfo;

    let parameters = program.parameters.map((x,i)=>{
        let block = document.createElement('div');
        block.className = 'parameter';
        let label = document.createElement('div');
        label.className = 'label';
        label.innerText = x.name + "=" + x.default;
        let slider = document.createElement('input');
        slider.className = 'slider';
        slider.type = 'range';
        slider.min = x.range[0];
        slider.max = x.range[1];
        slider.value = x.default;
        if(i==0){
            slider.oninput = function(){
            label.innerText = x.name + "=" + this.value;
            ctx.clearRect(0,0,w,h);
            scale.x = this.value;
            grid(scale)(origin);
            scaleX = (w/30)/scale.x;
            curve_plot(x=>1/sigma * 1/Math.sqrt(2*Math.PI)*Math.exp(-(x-10)*(x-10)/(kurt*sigma*sigma)))(-12*Math.PI)(12*Math.PI)(0.01);
            // curve_plot(x=>x*x)(-12*Math.PI)(12*Math.PI)(0.01);
            info.innerText = x.info;
            }
        }
        else if(i==1){
            slider.oninput = function(){
            label.innerText = x.name + "=" + this.value;
            ctx.clearRect(0,0,w,h);
            scale.y = (1/this.value);
            grid(scale)(origin);
            scaleY = (h/20)/scale.y;
            curve_plot(x=>1/sigma * 1/Math.sqrt(2*Math.PI)*Math.exp(-(x-10)*(x-10)/(kurt*sigma*sigma)))(-12*Math.PI)(12*Math.PI)(0.01);
            // curve_plot(x=>x*x)(-12*Math.PI)(12*Math.PI)(0.01);
            info.innerText = x.info;
            }
        }

        else if(i==2){
            slider.oninput = function(){
            label.innerText = x.name + "=" + this.value;
            ctx.clearRect(0,0,w,h);
            mean = this.value;
            grid(scale)(origin);
            curve_plot(x=>1/sigma * 1/Math.sqrt(2*Math.PI)*Math.exp(-(x-mean)*(x-mean)/(kurt*sigma*sigma)))(-12*Math.PI)(12*Math.PI)(0.01);
            // curve_plot(x=>x*x)(-12*Math.PI)(12*Math.PI)(0.01);
            info.innerText = x.info;
            }
        }

        else if(i==3){
            slider.oninput = function(){
            label.innerText = x.name + "=" + this.value;
            ctx.clearRect(0,0,w,h);
            sigma = this.value;
            grid(scale)(origin);
            curve_plot(x=>1/sigma * 1/Math.sqrt(2*Math.PI)*Math.exp(-(x-mean)*(x-mean)/(kurt*sigma*sigma)))(-12*Math.PI)(12*Math.PI)(0.01);
            // curve_plot(x=>x*x)(-12*Math.PI)(12*Math.PI)(0.01);
            info.innerText = x.info;
            }
        }
        
        else if(i==4){
            slider.oninput = function(){
            label.innerText = x.name + "=" + this.value;
            ctx.clearRect(0,0,w,h);
            kurt = this.value;
            grid(scale)(origin);
            curve_plot(x=>1/sigma * 1/Math.sqrt(2*Math.PI)*Math.exp(-(x-mean)*(x-mean)/(kurt*sigma*sigma)))(-12*Math.PI)(12*Math.PI)(0.01);
            // curve_plot(x=>x*x)(-12*Math.PI)(12*Math.PI)(0.01);
            info.innerText = x.info;
            }
        }


        block.appendChild(label);
        block.appendChild(slider);
        document.getElementsByClassName('parameterTable')[0].appendChild(block);
    });


    


    // let update =(val)=>{
    //     label[val].innerText = "Scale =" + this.value;
    //     grid()();



