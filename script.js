const body = document.documentElement;
const noteInput = document.querySelector(".notes__input");
const submitBtn = document.querySelector(".notes__submit");
const noteWrapper = document.querySelector(".notes__note__wrapper");
const searchInput = document.querySelector(".searchInput");
let noteArr = [];
let textArr = []; 


submitBtn.addEventListener("click", (event) => {
   if (noteInput.value && noteInput.value != Number(noteInput.value)) {
      addNote(); 
      noteInput.value = '';
   }
})

noteInput.addEventListener("keyup", (event) => {
   if (event.code === "Enter") {
      if (noteInput.value && noteInput.value != Number(noteInput.value)) {
         addNote(); 
         noteInput.value = '';
      }
   }
})



function addNote() {

   let noteText = noteInput.value;
   let note = document.createElement("div");
   let id = Math.random() * 1000;

   note.innerHTML = 
   `              <div class="note__text">
                     <div class="note__title">Заметка</div>
                     <div class="note__subtitle">${noteText}</div>
                     <button class="renameBtn" onclick="reNameNote(${id})" >изменить</button>
                  </div>
                  <div class="note__del">
                     <button class="deleteBtn" onclick="delNote(${id})" id="deleteBtn" >
                        <span class="line1"></span>
                        <span class="line2"></span>
                     </button>
                  </div>
   `;

   note.classList.add("note");
   note.setAttribute("data-id", id);
   noteWrapper.append(note);
   noteArr.push(id);
   textArr.push(noteText);
   
}


function delNote(id) {

   let noteIndex = noteArr.indexOf(id);
   noteArr.splice(noteIndex, 1);
   textArr.splice(noteIndex, 1);

   let notes = noteWrapper.children;
   for (let note of notes) {
      if (note.dataset.id == id) {
         note.remove();
      }
   }
}


function reNameNote(id) {

   let notes = noteWrapper.children;
   
   for (let note of notes) {
      if (note.dataset.id == id) {

         let btn = note.children[0].children[2];
         btn.disabled = true;

         let subtitle = note.children[0].children[1];
         let currentValue = subtitle.innerHTML;
         let newInput = document.createElement("textarea");
         newInput.setAttribute("cols", 37)
         newInput.setAttribute("rows", 5)
         // newInput.setAttribute("value", currentValue);
         newInput.innerHTML = currentValue;
         subtitle.innerHTML = "";
         subtitle.append(newInput);
         newInput.focus();

         let okBtn = document.createElement("button");
         okBtn.classList.add("okBtn");
         okBtn.innerHTML = "применить";
         note.children[0].append(okBtn);

         okBtn.addEventListener("click", (event) => {
            if (newInput.value != "" || event.code === "Enter") {

               subtitle.innerHTML = newInput.value;
               let textIndex = textArr.indexOf(currentValue);
               textArr[textIndex] = newInput.value;
               newInput.remove();
               btn.disabled = false;
               okBtn.remove();
               return;

            }
         })

         newInput.addEventListener("keyup", (event) => {
            if (event.code === "Enter") {
               
               subtitle.innerHTML = newInput.value;
               let textIndex = textArr.indexOf(currentValue);
               textArr[textIndex] = newInput.value;
               newInput.remove();
               if (okBtn) okBtn.remove();

               btn.disabled = false;

            } else if (event.code === "Enter" && newInput.value == "") {

               newInput.remove();
               subtitle.innerHTML = currentValue;
               if (okBtn) okBtn.remove();

               btn.disabled = false;
            }
         })


      }
   }
}


searchInput.addEventListener("keyup", (event) => {
   let subtitleArr = document.querySelectorAll(".note__subtitle");
   let text = searchInput.value.trim().toLowerCase();   
   for (let item of subtitleArr) {
      if ((item.innerHTML.toLowerCase()).includes(text) && text != "") {
         item.classList.add("_yellow");
      } else {
         item.classList.remove("_yellow");
      }
   }
   
})