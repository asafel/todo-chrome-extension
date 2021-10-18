/**
 * In this file we init the button and iframe which are staticly visible on each page
 * 
 */

const listActionBtn = document.createElement('button');
const iframeElement = document.createElement('iframe');

// Define action btn
listActionBtn.innerHTML = "My Tasks";
listActionBtn.className="task-btn";
listActionBtn.style.cssText = 'position:fixed;opacity:70%;top:0;z-index:1234124;margin:40px;border:1px solid black;padding:10px;background:black;border-radius: 6px;color: white;font-weight: bold;cursor:pointer;';
listActionBtn.onclick = function () {
    if (iframeElement.style.display === 'none') {
        iframeElement.style.display = 'block'
    } else {
        iframeElement.style.display = 'none'
    }
};

// Define iframe
iframeElement.src = chrome.extension.getURL('/logic/btn_list.html');
iframeElement.style.cssText = 'z-index: 9999999;position:fixed;top:100px;left:42px;background-color:white;border-radius:6px;width:400px;height:500px;border: 1px;box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;';

iframeElement.className = "iframe-list"
iframeElement.style.display = 'none'


document.body.appendChild(listActionBtn);
document.body.appendChild(iframeElement);