window.dom = {
    //  创建一个节点
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },

    //  新增弟弟,在node的后面加入node2
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },

    //  新增哥哥,在node前面加入node2
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },

    //  新增儿子
    append(parent, node) {
        parent.appendChild(node);
    },

    //  新增爸爸，把parent包在node外面
    wrap(node, parent) {
        dom.before(node, parent);
        dom.append(parent, node);
    },

    //  删除节点
    remove(node) {
        node.parentNode.removeChild(node);
    },

    // 删除后代
    empty(node) {
        // const childNodes = node.childNodes;  ===   const { childNodes } = node;
        const array = [];
        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },

    //  修改属性
    attr(node, name, value) {  //  重载
        if (arguments.length === 3) {  // 读
            node.setAttribute(name, value);
        }
        else if (arguments.length === 2) {  //  写
            return node.getAttribute(name);
        }
    },

    //  修改标签的文本内容
    text(node, string) {
        if (arguments.length === 2)  //  写
        {
            if ('innerText' in node) {     //  适配
                node.innerText = string;   //  ie
            }
            else {
                node.textContent = string;  // FireFox / Chrome
            }
        } else if (arguments.length === 1) {  //  读
            if ('innerText' in node) {
                return node.innerText;
            }
            else {
                return node.textContent;
            }
        }

    },

    //  修改html内容
    html(node, string) {
        if (arguments.length === 2)  //  写
        {
            node.innerHTML = string;
        } else if (arguments.length === 1) {  //  读
            return innerHTML;

        }
    },

    //  修改style属性
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div,'color','red')
            node.style[name] = value;
        }
        else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div,'color')
                return node.style[name];
            }
            else if (name instanceof Object) {
                // dom.style(div,{color:'red'})
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },

    //  class
    class: {
        add(node, classname) {
            node.classList.add(classname);
        },

        remove(node, classname) {
            node.classList.remove(classname);
        },

        //  判断一个节点是否有classname属性值
        has(node, classname) {
            return node.classList.contains(classname);
        },

        //  触发点击鼠标点击事件
        on(node, eventName, fn) {
            node.addEventListener(eventName, fn);
        },

        //  移除鼠标点击事件
        off(node, eventName, fn) {
            node.removeEventListener(eventName, fn);
        },

        //  
        find(selector, scope) {
            return (scope || document).querySelectorAll(selector);
        },

        parent(node) {
            return node.parent;
        },

        children(node) {
            return node.children;
        },

        //  找到node的兄弟
        siblings(node) {
            //  先把伪数组变成数组，然后筛选不是node的节点
            return Array.from(node.parentNode.children).filter(n => n != node);
        },

        //  找到node的下一个兄弟节点
        next(node) {
            let x = node.nextSibling;
            //  当不x存在直接返回x
            //  x存在，但x的类型是文本时，查找x的下一个兄弟节点
            while (x && x.nodeType === 3) {
                x = x.nextSibling;
            }
            return x;
        },

        //  找到x的上一个兄弟节点
        previous(node) {
            let x = node.previousSibling;
            while (x && x.nodeType === 3) {
                x = x.previousSibling;
            }
            return x;
        },

        //  遍历所有节点
        each(nodeList, fn) {
            for (let i = 0; i < nodeList.length; i++) {
                fn.call(null, nodeList[i]);
            }
        },

        //  找到node节点的索引，即位置
        index(node) {
            //  获取他的所有兄弟节点(包括node)
            const list = dom.class.children(node.parentNode);
            let i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === node) {
                    break;
                }
            }
            return i;
        }

    }// class

};




