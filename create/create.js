import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const data = new FormData(form);
    const name = data.get('bunny-name');
    const familyId = data.get('family-id');
    // use createBunny to create a bunny with this name and family id
    await createBunny({
        name: name,
        family_id: familyId,
    });
    window.location.replace('../families');

    form.reset();
});

window.addEventListener('load', async () => {
    const select = document.querySelector('select');
    // let's dynamically fill in the families dropdown from supabase
    const families = await getFamilies();
    // grab the select HTML element from the DOM
    for (let family of families) {
        const option = document.createElement('option');
        option.value = family.id;
        option.textContent = family.name;
        select.append(option);
    }
    // go get the families from supabase
    // for each family
    // create an option tag
    // set the option's value and text content
    // and append the option to the select
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
