const Obniz = require("obniz");
var { PythonShell } = require("python-shell");
var options = { pythonPath: 'c:\\Users\\tk061\\Anaconda3\\envs\\hack\\python.exe' }

//pop-up発生
//pygameがインストールされてるPythonを明示しないと実行できない
function popup(send_data) {
    var pyshell = new PythonShell('./popup.py',options);
    pyshell.send(send_data);
    pyshell.on('message', function (data_python) {
        console.log(data_python);
      });
};

function main(who) {
    console.log('main is called');
    var obniz = new Obniz("2641-9824");
    obniz.onconnect = async function () {
        console.log("connected")
        var hcsr04 = obniz.wired("HC-SR04", { gnd: 0, echo: 1, trigger: 2, vcc: 3 });

        //PCまでの基準距離
        const dist0 = await hcsr04.measureWait();
        let loop_n = 1;
        while (obniz.connectionState === "connected") {
            let avg = 0;
            let count = 0;
            let date1 = new Date();
            let now = date1.getHours() + "h" +
                date1.getMinutes() + "m" +
                date1.getSeconds() + "s" +
                date1.getMilliseconds() + "ms";
            console.log("loop:" + loop_n + "回目　start_time:" + now);
            console.log("基準距離：" + dist0);
            for (let i = 0; i < 6; i++) { // 5回の計測の平均を実測値として扱う
                const val = await hcsr04.measureWait();
                if (val) {
                    count++;
                    avg += val;
                    let date1 = new Date();
                    let now = date1.getHours() + "h" +
                        date1.getMinutes() + "m" +
                        date1.getSeconds() + "s" +
                        date1.getMilliseconds() + "ms";
                    console.log("i=" + i + ": " + now + " dist:" + val);
                }
                // await obniz.wait(1000); //1秒ごとに距離を計測
            }
            if (count > 1) {
                avg /= count;
            }

            console.log("avg=" + avg);
            loop_n++;
            console.log("Math.abs(dist0-avg):" + Math.abs(dist0 - avg));
            if (Math.abs(dist0 - avg) > 200) { //基準距離から20cm以上離れたらpopup表示
                popup(who);
            }
            await obniz.wait(5000); //5秒ごとに距離を計測
        }
    }
}

//server 構築
var http = require('http');
var index = require('fs').readFileSync('index.html', 'utf-8');
var result = require('fs').readFileSync('result.html', 'utf-8');
var data = '';
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        //通信に成功したらindex.htmlを表示
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(index);
    } else if (req.method === 'POST') {
        //POSTデータ受信
        req.on('data', function (chunk) { data = chunk })
            .on('end', function () {
                console.log("success!");
                res.end(result);
                let who = data.slice(4);
                console.log("who :"+who);
                main(who);
            })
    }
}).listen(8080, '127.0.0.1');
console.log('http://127.0.0.1:8080/index.html');

// main("hamabe");