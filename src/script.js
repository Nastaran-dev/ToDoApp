const btn = document.querySelector('button')
const inp = document.querySelector('input')
const _do=document.querySelector('#do')
const clear = document.getElementById('Clear')
let arr=[]
// unload =>get
let x =JSON.parse(localStorage.getItem('data'))
if(x!=undefined){
    arr = [...x]
    arr.forEach(function(item){
        Genli(item)
    })
}else{
    arr =[]
}

function AddToTasK(){
    let MyTemp = inp.value
    if(MyTemp==''){
        alert('Please Fill In the Blank')
    }else{
        // let li = document.createElement('li')
        // li.innerHTML=`
        // <div class="flex gap-2 items-center">
        // <input type="checkbox" onchange=MyCheCk(this)>
        // <h2>${MyTemp}</h2>
        // </div>
        // <div class="flex items-center">
        // <img onclick=MyEdit(this) src="img/output-onlinegiftools.gif" alt="" class="w-[30px] flex">
        // <img onclick=MyDel(this) src="img/bin (2).gif" alt="" class="w-[30px]">
        // </div>
        
        // `
        // _do.appendChild(li)
        // add to LocalStorage
        Genli(MyTemp)
        arr.push(inp.value)
        localStorage.setItem('data' ,JSON.stringify(arr))
        inp.value=null
        inp.focus()
      

    }
}
function Genli(val){
     let li = document.createElement('li')
     let MyTemp = val
        li.innerHTML=`
        <div class="flex gap-2 items-center">
        <input type="checkbox" onchange=MyCheCk(this) class="cursor-pointer">
        <h2 >${MyTemp}</h2>
        </div>
        <div class="flex items-center">
        <img onclick=MyEdit(this) src="img/output-onlinegiftools.gif" alt="" class="w-[30px] flex cursor-pointer">
        <img onclick=MyDel(this) src="img/bin (2).gif" alt="" class="w-[30px] cursor-pointer">
        </div>
        
        `
        _do.appendChild(li)
         UpDateProgress()

}
// /////////////////////////////////delete
function MyDel(s){
    if(confirm('Are You Sure?')) {
        const li = s.closest('li');   
        let txt = li.querySelector('h2').innerText;
        li.remove();
        arr = arr.filter(item => item !== txt);
        UpDateProgress()
        save();
    }
}
// ////////////////////////////////edite
function MyEdit(s) {
    const li = s.closest('li');
    const h2 = li.querySelector('h2');
    inp.value = h2.innerText;
    arr = arr.filter(item => item !== h2.innerText)
    li.remove();
    UpDateProgress();
    save();
}
// //////////////////////////////chesck
function MyCheCk(s){
  const h2 = s.nextElementSibling
  h2.classList.toggle('del' , s.checked)
 UpDateProgress()
save();
}
// ///////////////////////////////////////////////////////////////////////////////
function UpDateProgress(){
    const li = document.querySelectorAll('#do li').length
    const check = document.querySelectorAll('input[type="checkbox"]:checked').length
    let percent;
    if(li===0){
        percent=0;
    }else{
        percent=(check/li)*100
    }
    document.querySelector('#progress').style.width=percent + '%'
    document.querySelector('#progress-text').innerText=`${check}/${li}`
    save();
}
// clear
function save() {
    localStorage.setItem('data', JSON.stringify(arr));
}
// clear
clear.addEventListener('click' , function(){
    if(!confirm('Are You Sure Delete All?')) return;
    arr=[]
    localStorage.removeItem('data')
    _do.innerHTML=''
    UpDateProgress()
})


