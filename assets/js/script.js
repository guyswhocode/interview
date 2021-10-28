const overlay = document.getElementsByClassName('overlay')[0];
const modal = document.getElementsByClassName('modal')[0];
const questions = document.getElementsByClassName('questions')[0];
const questionsContainer = document.getElementsByClassName('questions-container')[0];

function showQuestionPopup(){
  setOverlay(true);
  setModal(true);
}

function addQuestions() {
  parseAndSetQuestions();
  setModal(false);
  setOverlay(false);
}

function parseAndSetQuestions() {
  const data = questions.value;
  const questionBack = parseQuestions(data);

  questionsContainer.innerHTML = renderQuestions(questionBack);
}

function renderQuestions(qb) {
  let content = [];

  for (const session of (qb || {})){
      content.push(`<tr><td colspan="3"><h3 class="session-heading">${session.topic}</h3></td></tr>`)

      for(const question of (session.questions || [])){
        content.push(`<tr>
            <td>${question}</td>
            <td>
              <div>
                <input type="range" min="0" max="5" value="0" step="1">
              </div>
            </td>
            <td><textarea cols="25" rows="2" placeholder="Comment goes here."></textarea></td>
          </tr>`)
      }
  }

  return content.join('\n');
}

function parseQuestions(data){
  const lines = data.split('\n').filter(l => l.trim() !== '').map(l => l.trim());
  const questionBank = [];
  let session = {};
  
  for(const [lineIndex, line] of lines.entries()){    
    if(line.startsWith('#')){
      if(lineIndex !== 0){
        questionBank.push(session);
      }
      session = {};
      session.topic = line.split('#')[1].trim(); 
    }
    
    if(line.startsWith('-')){
      session.questions = (session.questions|| []).concat(line.split('-')[1].trim()); 
    }
    
    if(lineIndex == lines.length - 1){
      questionBank.push(session);
    }
  }
  
  return questionBank;
}

function cancel(){
  setModal(false);
  setOverlay(false);
}

function setOverlay(enable){
  if(enable) {
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
}

function setModal(enable){
  if(enable) {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}