/*
 name: todolist
 purpose: keep a list of todo item
 version: 1.0
 author: George Louis
 date: 3/12/2018
*/
window.onload = function() {
	//variables
	let search ="no";
	let form = document.getElementById("form");
	let input = document.getElementById("input"); 
	let input2 = document.getElementById("input2");
	let btn = document.getElementById("btn");
	let list = document.getElementById("list");	 
	let btnsearch = document.getElementById("searchbtn");
	let btnClr = document.getElementById("btnClr");	
	let id = 1; 
	let liItem = "";
	let todoList = [];
 
 
	btn.addEventListener("click", addTodoItem);  
	btnsearch.addEventListener("click", searchitem); 
	list.addEventListener("click", boxChecked); 
	btnClr.addEventListener("click", clearList);

	if(localStorage.length <= 0) 
	{  
	}
 
	if(localStorage.length > 0) {
		displayList(); 
	}


	function searchitem() 
	{  
	}
 
	function addTodoItem() {
		if(input.value === "") {
			alert("Filed cannot be empty");
		}
		else {
			if(list.style.borderTop === "") { 
				list.style.borderTop = "2px solid white";
				btnClr.style.display = "inline";
			}
			let text = input.value.trim();	
			let item = `<li id="li-${id}">${text}<input id="box-${id}" 			class="checkboxes" type="checkbox"></li>`;				
			list.insertAdjacentHTML('beforeend', item);	
			liItem = {item: text, checked: false};
			todoList.push(liItem);		
			id++; 
			form.reset();
		}
	}
 
	function boxChecked(event) {
		let element = event.target;
		if(element.type === "checkbox") {
			alert(element.type);
			element.parentNode.style.textDecoration = "line-through";
			todoList = JSON.parse(localStorage.getItem("todoList"));
			todoList[element.id.split('-')[1]-1].checked = element.checked.toString();
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		 
		

	}
 
 
 
	function displayList() { 

		list.style.borderTop = "2px solid white";
		todoList = JSON.parse(localStorage.getItem("todoList"));

		if(search=="yes")
		{  

			list.innerHTML = "";
			btnClr.style.display = "none";
			list.style.borderTop = ""; 
			let text2 = input2.value.trim();	
			todoList.forEach(function(element) {
				console.log(element.item)

				let text = element.item; 
				if(text2==text)
				{
				 
				let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
				list.insertAdjacentHTML("beforeend", item); 
				if(element.checked) {
					var li = document.getElementById("li-"+id);
					li.style.textDecoration = "line-through";
					li.childNodes[1].checked = element.checked;
				}
				id++;
			}
			});
			search="no";

		}
		else
		{
		
		todoList.forEach(function(element) {
			console.log(element.item)
			let text = element.item;
			let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
			list.insertAdjacentHTML("beforeend", item); 
			if(element.checked) {
				var li = document.getElementById("li-"+id);
				li.style.textDecoration = "line-through";
				li.childNodes[1].checked = element.checked;
			}
			id++;
		});

	}
	}
 
	function clearList() {

		todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		btnClr.style.display = "none";
		list.style.borderTop = "";
	}


	 
}