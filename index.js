let tasks=[];
const task_notes_section= document.getElementById('task_notes_section');
const now = new Date();
const today= new Date().toISOString().split('T')[0];
function on_submit(form){
    event.preventDefault();
    const my_text= document.getElementById('text').value;
    const my_date= document.getElementById('date').value;
    const my_hour= document.getElementById('hour').value;
    let task={       
            text:my_text,
            date:my_date,
            hour:my_hour,};
    const my_validation= validate(task);
    if(my_validation){
        alert(my_validation +'  is missed!');
        return;}
    tasks.push(task); 
    print_note(task);
    save_to_local(tasks);
    form.reset();
}
function validate(task){
    for(const props in task){
           if(!task[props]){
           return props;
        }
    }
}
function print_note(task){
    let div= document.createElement('div');
    div.setAttribute('class', 'task_note');
    div.setAttribute('id', task.text);
    div.innerHTML =
       `<div id="task_text">${task.text}</div>
        <div id="task_date"> ${task.date}<br> ${task.hour}</div>
        <button id="delete" class="btn btn-outline-danger "
        onclick="delete_me('${encodeURIComponent(JSON.stringify(task))}')">
        <i class="bi bi-trash"></i></button>`  
    task_notes_section.appendChild(div);
    check_time(task,div);
}
 function delete_me(taskObj){
    const task = JSON.parse(decodeURIComponent(taskObj));
    const div = document.getElementById(task.text);
    div.remove();
    const index = tasks.findIndex(object => { return object.text === task.text;});
    tasks.splice(index, 1);
    save_to_local(tasks);  
}
function check_time(task,div){
      if(task.date == today ){    
        div.style.color= 'red';
        div.innerHTML += '<div id="today_caution">for today!</div>'}
}
function save_to_local(task){
    const json= JSON.stringify(task);
    localStorage.setItem('task', json);    
}
function read_local(){
    const last_tasks=JSON.parse(localStorage.getItem('task'));  
    for(const item of last_tasks){
        print_note(item)   
    } 
    tasks=last_tasks; 
}



