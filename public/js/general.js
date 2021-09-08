class GeneralClass {
	constructor(){

	}
	static fetch_function(url, data, howSend="POST"){
		fetch(url,{
			method:howSend,
			headers: {'Content-Type': 'application/json'},
			body:JSON.stringify(data)
		})
		.then((res)=>res.json())
		.then((data)=>{
				const {msg, messageStatus ,status, page} = data;
				this.message_box(status, messageStatus, msg, page);	
		})
		.catch((err)=>console.log(err));
	}
	static message_box(isMessage, messageStatus, message, page){
		const mainMesssageContainer = document.querySelector(".messageBoxContainer");
		const innerMessageBox = document.querySelector(".messageBox");
		const stausMessage = document.querySelector(".stausMessage");
		const mainMessage = document.querySelector(".message");
		const svg_icon = document.querySelector(".svg_icon");
		const messageButton = document.querySelector(".messageButton");
		if(isMessage){
			mainMesssageContainer.classList.add("messageBoxContainer_active");
			stausMessage.innerText = messageStatus;
			mainMessage.innerText = message;
			svg_icon.src = "/images/success.svg";
			stausMessage.style.color="#87CC6D";
			messageButton.style.background = "#87CC6D";
			setTimeout(()=>{
				innerMessageBox.classList.add("messageBox_active");
			},500);
		}else{
			svg_icon.src = "/images/fail.svg";
			stausMessage.innerText = messageStatus;
			stausMessage.style.color="#D0011B";
			messageButton.style.background = "#D0011B";
			mainMessage.innerText = message;
			mainMesssageContainer.classList.add("messageBoxContainer_active");
			setTimeout(()=>{
				innerMessageBox.classList.add("messageBox_active");
			},500);
		}

		messageButton.addEventListener("click",()=>{
			if(page){
				window.location.href = `${page}`;
			}else{
				innerMessageBox.classList.remove("messageBox_active");
				setTimeout(()=>{
					mainMesssageContainer.classList.remove("messageBoxContainer_active");
				},1000);
			}
		});
		
	}
	change_menu(){
		const allMenus = document.querySelectorAll(".d_menu");
		const allSection = document.querySelectorAll(".innerMain");
		allMenus.forEach((menu)=>{
			menu.addEventListener("click",()=>{
				allSection.forEach((section)=>{
					if(section.dataset.section == menu.dataset.menu){
						section.classList.add("section_acitve");
						localStorage.setItem("acitve", section.dataset.section);
					}else{
						section.classList.remove("section_acitve")
					}
					
				});
			})
			//IF PAGE RELAOD STAY AT THE SAME PAGE
			allSection.forEach((section)=>{
				if(section.dataset.section == localStorage.getItem("acitve")){
					section.classList.add("section_acitve");
				}
			});
		});
	}
	editable_dashbaord(){
			const editableBtn = document.querySelector(".d_ditableContent");
			const pargraph = document.querySelector(".edit_dashboardText");
			const title= document.querySelector(".edit_dashboardtitle");
		
			if(editableBtn){
				editableBtn.addEventListener("click",()=>{
					pargraph.setAttribute("contenteditable",true);
					title.setAttribute("contenteditable",true);
				});	
			}
	}

}

var generalAction = new GeneralClass();
generalAction.change_menu();
generalAction.editable_dashbaord();

class UserClass {
	constructor(){
		this.email = document.getElementById("email");
		this.password = document.getElementById("password");
	}
	register_user(){
		const name = document.getElementById("name");
		const username = document.getElementById("username");
		const btn_signup = document.querySelector("#sginup");
		if(btn_signup){
			btn_signup.addEventListener("click",(e)=>{
				e.preventDefault();
				GeneralClass.fetch_function("/register", {name:name.value,username:username.value, email:this.email.value, password:this.password.value}, "POST");
			});
		}
		
	}
	login_user(){
		const btn_login = document.querySelector("#login");
		if(btn_login){
			btn_login.addEventListener("click",(e)=>{
				e.preventDefault();
				GeneralClass.fetch_function("/login", { email:this.email.value, password:this.password.value}, "POST");
			});
		}
	}
	logout_user(){
		const logOut = document.getElementById("logout");
		if(logOut){
			logOut.addEventListener("click",()=>{
				GeneralClass.fetch_function("/logout", {isLogout:true }, "POST");
			});
		}

	}
}
var userAction = new UserClass();
userAction.register_user();
userAction.login_user();
userAction.logout_user();