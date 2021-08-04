//  调用dom.create 创建一个节点
const div = dom.create("<div><span>newnode</span></div>");
console.log(div)

//  在test后面加入div
dom.after(test, div);

//  用div3把test包住
const div3 = dom.create('<div id="parent"></div>');
dom.wrap(test, div3);

//  清空节点的后代
const nodes = dom.empty(window.empty);
console.log(nodes)

//  修改title的属性值
dom.attr(test, 'title', 'hi,Taysia');

//  获取title的值
const title = dom.attr(test, 'title');
console.log(`title:${'title'}`);

//  修改test的文本内容
dom.text(test, '这是新的内容');
console.log(dom.text(test));

/*
//  给test添加style元素
dom.style(test, { border: '1px solid red', color: 'blue' })
dom.style(test, 'color', 'green');
console.log(dom.style(test, 'color'))
*/

//  调用class，在test节点加上属性
dom.class.add(test, 'red')
dom.class.add(test, 'blue');
dom.class.remove(test, 'blue');
console.log(dom.class.has(test, 'blue'));

//  鼠标点击事件
const fn = () => {
    console.log('点击了');
}
dom.class.on(test, 'click', fn);
dom.class.off(test, 'click', fn);

//  找到test节点
const testDiv = dom.class.find('#test')[0];
console.log(testDiv);

//  找到test2中的red属性
const test2 = dom.class.find('#test2')[0];
console.log(dom.class.find('.red', test2)[0]);

console.log(dom.class.parent(test));


//  找到s2的兄弟
const s2 = dom.class.find('#s2')[0];
console.log(dom.class.siblings(s2));
console.log(dom.class.next(s2));
console.log(dom.class.previous(s2));


const t = dom.class.find('#travel')[0];
// 先遍历travel的所有children，在调用dom.style添加样式  
dom.class.each(dom.class.children(t), (n) => dom.style(n, 'color', 'red'));

//  查找s2的排行（位置）
console.log(dom.class.index(s2));