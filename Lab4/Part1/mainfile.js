// Get references to HTML elements
var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');
// Function to return a random value from an array
function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

// The story template with placeholders
var storyText = "It was 94 farenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but he was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
// Arrays of possible values for placeholders
var insertX = ["Willy the Goblin","Big Daddy","Father Christmas"];
var insertY = ["the soup kitchen","Disneyland","the White House"];
var insertZ = ["spontaneously combusted","melted into a puddle on the sidewalk", "turned into a slug and crawled away"];
// Event listener for the randomize button
randomize.addEventListener('click', result);
// Function to generate and display the random story
function result() {
   // Create a copy of the story template 
   var newStory = storyText;
// Variables to store randomly selected values for placeholders
var xItem, yItem, zItem;
// Randomly select values for each placeholder
xItem = randomValueFromArray(insertX);
yItem = randomValueFromArray(insertY);
zItem = randomValueFromArray(insertZ);
// Replace placeholders with randomly selected values
newStory = newStory.replace(":insertx:",xItem);
newStory = newStory.replace(":inserty:",yItem);
newStory = newStory.replace(":insertz:",zItem);
newStory = newStory.replace(":insertx:",xItem);
   // Replace "Bob" with a custom name if provided
  if(customName.value != '') {
    var name = customName.value;
    newStory = newStory.replace('Bob', name);
  }
  
   // If the UK checkbox is checked, convert temperature to centigrade and weight to stones

  if(document.getElementById("uk").checked) {
    var stonesPerPound = 0.0714286;
    var weight = Math.round(300*stonesPerPound)+' stone';
    var temperature =  Math.round((94-32)*5/9)+' centigrade';
    newStory = newStory.replace("94 farenheit", temperature);  
    newStory = newStory.replace("300 pounds", weight); 
  }
  // Display the generated story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}