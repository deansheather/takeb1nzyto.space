// Initial variables
window.partyMode = {
    active: false,
};

/*
* Toggle the party.
*/
function togglePartyMode() {
 if (!config.partyMode ) return;

 if (partyMode.active) {
   document.body.classList.remove('party-mode');
   partyMode.active = false;
 } else {
   document.body.classList.add('party-mode');
   partyMode.active = true;
 }
}

// Mousetrap handler for party-mode
Mousetrap.bind('p', togglePartyMode);

if (query.hasOwnProperty('party')) {
  togglePartyMode()
}
