function addStyles(win, styles) {
    styles.forEach((style) => {
        let link = win.document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", style);
        win.document.getElementsByTagName("head")[0].appendChild(link);
    });
}

const VueHtmlToPaper = {
    install(app, options = {}) {
        app.config.globalProperties.$htmlToPaper = (
            el,
            localOptions,
            cb = () => true
        ) => {
            let defaultName = "facture",
                defaultSpecs = ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
                defaultReplace = true,
                defaultStyles = [];
            let {
                name = defaultName,
                specs = defaultSpecs,
                replace = defaultReplace,
                styles = defaultStyles
            } = options;

            // If has localOptions
            // TODO: improve logic

            specs = !specs.length ? specs.join(",") : "";

            const element = window.document.getElementById(el);

            if (!element) {
                alert(`Element to print #${el} not found!`);
                return;
            }

            const url = "";
            const win = window.open(url, name, specs, replace);

            win.document.write(`
          <html>
           
            <style>
            *{
    margin: 0;
    box-sizing: border-box;

}
.sign{
  float:right;
  margin-top: 30px;
  text-align: right;
}
.line{
  width: 142px;
  height: 10px;
  border-bottom: 1px solid #ba7a92;
  position: absolute;
}
body{
    background: #E0E0E0;

    background-repeat: repeat-y;
    background-size: 100%;
}
::selection {background: #f31544; color: #FFF;}

h1{
    font-size: 1.5em;
    color: #222;
}
h2{font-size: .9em;}
h3{
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
}
.buton{

    margin: 0 auto;
    width: 800px;
    background-color: #141415;
    padding: 15px;
}
p{
    font-size: .7em;
    color: #666;
    line-height: 1.2em;
}

#invoiceholder{
    width:100%;
    hieght: 100%;
    padding-top: 50px;
}
#headerimage{
    z-index:-1;
    position:relative;
    top: -50px;
    height: 350px;


    -webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,.15), inset 0 -2px 4px rgba(0,0,0,.15);
    -moz-box-shadow:inset 0 2px 4px rgba(0,0,0,.15), inset 0 -2px 4px rgba(0,0,0,.15);
    box-shadow:inset 0 2px 4px rgba(0,0,0,.15), inset 0 -2px 4px rgba(0,0,0,.15);
    overflow:hidden;
    background-attachment: fixed;
    background-size: 1920px 80%;
    background-position: 50% -90%;
}
#invoice{
    position: relative;
    top: -290px;
    margin: 0 auto;
    width: 800px;
    background: #FFF;
}

[id*='invoice-']{ /* Targets all id with 'col-' */
    border-bottom: 1px solid #ba7a92;
    padding: 30px;
}

#invoice-top{min-height: 120px;}
#invoice-mid{min-height: 120px;}
#invoice-bot{ min-height: 250px;}

.logo{
    float: left;
    height: 70px;
    width: 160px;

    background-size: 160px 70px;
}
.client{
    font-size: 19px;
}
.info{

    float:left;
    margin-left: 20px;
}
.title{
    float: right;
}
.title p{text-align: right;}
#project{margin-left: 52%;}
table{
    width: 100%;
    border-collapse: collapse;
}
.orthocolor{
    color:#ba7a92;
}
td{
    padding: 5px 0 5px 15px;
    border: 1px solid #EEE
}
.tabletitle{
    padding: 5px;
    background: #EEE;
}
.service{border: 1px solid #EEE;}
.item{width: 50%;}
.itemtext{font-size: .9em;}

#legalcopy{
    margin-top: 30px;
}
form{
    float:right;
    margin-top: 30px;
    text-align: right;
}





.legal{
    width:30%;
}

</style>
            <body>
              ${element.innerHTML}
            </body>
          </html>
          
        `);

            addStyles(win, styles);

            setTimeout(() => {
                win.document.close();
                win.focus();
                win.print();
                win.close();
                cb();
            }, 1000);

            return true;
        };
    }
};

export default VueHtmlToPaper;