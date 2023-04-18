const image_array = ['turtle-icon_1.png',
    'squirrel-icon_1.png',
    'frog-icon_1.png',
    'horse-icon_1.png',
    'gorilla-icon_1.png',
    'b24-icon_1.png',
    'cat-icon_1.png',
    'kangoroo-icon_1.png',
    'fox-icon_1.png',
    'furby-icon_1.png',
    'camel-icon_1.png',
    'bee-icon_1.png',
    'butterfly-icon_1.png',
    'giraffe-icon_1.png',
    'tiger-icon_1.png',
    'pig-icon_1.png',
    'zebra-icon_1.png'];

const farewell_image_array = [
    'fw_best_friends.png',
    'fw_miss_you.png'
    // 'fw_thanks.png'
];

const LAST_MEMBER = "Лена";

var scrumMembers = [];
var showIndex = -1;

function random_image() {
    const randomImage = image_array[Math.floor(Math.random() * image_array.length)];
    return 'img/icons/' + randomImage
}

function randomImage(imageArray) {
    let randomIndex = Math.floor(Math.random() * imageArray.length);
    const randomImage = imageArray[randomIndex];
    imageArray.splice(randomIndex, 1);
    return 'img/icons/' + randomImage
}

const types = {
    REGULAR: 'regular',
    CENTER: 'center'
};

function create_member(name, id, type, image = null) {
    let chip = document.createElement("a");
    let img = document.createElement("img");
    chip.setAttribute('id', 'member_' + id);
    img.setAttribute('alt', 'Contact Person');
    chip.textContent = name.trim();

    switch (type) {
        case types.REGULAR:
            chip.setAttribute('class', 'chip mt-3 mb-0 font-chips chip-lg cyan darken-2 white-text');
            break;
        case types.CENTER:
            chip.setAttribute('class', 'chip mt-3 mb-0 font-chip-center chip-lg cyan darken-2 white-text animated fadeIn');
            break;
        default:
            chip.setAttribute('class', 'chip mt-3 mb-0 font-chips chip-lg cyan darken-2 white-text');
    }

    if (image === null) {
        img.setAttribute('src', random_image());
    } else {
        img.setAttribute('src', image);
    }
    chip.appendChild(img);

    if (type === types.REGULAR) {
        let chips = document.getElementById("chips");
        chips.appendChild(chip);
    } else if (type === types.CENTER) {
        let chips = document.getElementById("center_chip");
        chips.appendChild(chip);
    } else {
        console.error("Wrong member type");
    }

}

// Reset all
function remove_member_center() {
    let elements = document.getElementById("center_chip").getElementsByTagName("a");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// function move_member(id) {
//     remove_member_center();
//     let elem = document.getElementById(id);
//     elem.classList.add("animated");
//     elem.classList.add("fadeOut");
//     let image = document.getElementById(id).getElementsByTagName("*")[0].getAttribute("src");
//     create_member(elem.textContent, -1, types.CENTER, image);
// }

/*
    Choose next random member to move in center
 */
// function choose_random_member() {
//     let elements = document.getElementById("chips").querySelectorAll("a:not(.animated)");
//     const randomElement = elements[Math.floor(Math.random() * elements.length)];
//     move_member(randomElement.getAttribute("id"));
// }

function nextMember() {
    if (showIndex < scrumMembers.length - 1) {
        showIndex++;
        showMember()
    }
}

function back() {
    if (showIndex > 0) {
        showIndex--;
        showMember()
    }
}

function showMember() {
    remove_member_center();

    currentScrumMember = scrumMembers.find(member => member.order === showIndex);

    let memberId = 'member_' + currentScrumMember.id;
    let memberElement = document.getElementById(memberId);
    memberElement.classList.add("animated");
    memberElement.classList.add("fadeOut");

    create_member(
        currentScrumMember.name,
        -1,
        types.CENTER,
        currentScrumMember.image
    );
}


/*
    Create members from input field
 */
// function create_members() {
//     clearCurrentMembers();
//     let members_string = document.getElementById("members_add").value;
//     let members = members_string.split(',');
//     let members_custom = document.getElementById("custom_members").getElementsByClassName("custom_toggle_button");
//     var custom_members_checks = {};
//     members_custom.forEach(function (item) {
//         custom_members_checks[item.id.split("_")[1]] = item.checked;
//     });
//     let members_custom_inputs = document.getElementById("custom_members").getElementsByTagName("input");
//     members_custom_inputs.forEach(function (item) {
//         if (item.type === 'text') {
//             if (custom_members_checks[item.id.split("_")[1]]) {
//                 members.push(item.value);
//             }
//         }
//     });
//
//     members.forEach(function (item, index) {
//         if (item.length > 0) {
//             create_member(item, index, types.REGULAR, null);
//         }
//     });
//     remove_member_center();
// }

function clearCurrentMembers() {
    showIndex = -1;
    remove_member_center();
    let elements = document.getElementById("chips").getElementsByTagName("a");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function createMembers() {
    clearCurrentMembers();
    generateMembers();
    showMembers();
}

function showMembers() {
    if (scrumMembers) {
        scrumMembers.forEach(function (scrumMember) {
            create_member(
                scrumMember.name,
                scrumMember.id,
                types.REGULAR,
                scrumMember.image
            );
        })
    }
}

function generateMembers() {
    let additionalMemberNamesString = document.getElementById("members_add").value;
    let memberNames = [];
    if (additionalMemberNamesString.length > 0) {
        memberNames = additionalMemberNamesString.split(',');
    }
    let members_custom = document.getElementById("custom_members").getElementsByClassName("custom_toggle_button");
    var custom_members_checks = {};
    members_custom.forEach(function (item) {
        custom_members_checks[item.id.split("_")[1]] = item.checked;
    });
    let members_custom_inputs = document.getElementById("custom_members").getElementsByTagName("input");
    members_custom_inputs.forEach(function (item) {
        if (item.type === 'text') {
            if (custom_members_checks[item.id.split("_")[1]]) {
                memberNames.push(item.value);
            }
        }
    });

    scrumMembers = [];
    let imageArray = [];
    let farewellImageArray = [...farewell_image_array];

    let lastMemberIndex = memberNames.findIndex(memberName => memberName === LAST_MEMBER);
    if (lastMemberIndex>=0) {
        memberNames.splice(lastMemberIndex, 1);
        memberNames.push(LAST_MEMBER);
    }
    let orders = generateOrder(memberNames.length, lastMemberIndex>=0);

    memberNames.forEach(function (name, index) {
        let image;
        if (name === LAST_MEMBER) {
            image = randomImage(farewellImageArray);
        } else {
            if (imageArray.length === 0) {
                imageArray = [...image_array];
            }
            image = randomImage(imageArray);
        }

        scrumMembers.push({
            'id': index,
            'name': name,
            'image': image,
            'order': orders[index]
        });
    });
}

function updateOrder() {
    let lastUserInMembers = scrumMembers.findIndex(member => member.name === LAST_MEMBER) >= 0;
    let orders = generateOrder(scrumMembers.length, lastUserInMembers);
    scrumMembers.forEach(function (member, index) {
        member.order = orders[index];
    });
}

function generateOrder(length, lastUserInList) {
    let temp = [];
    let result = [];

    let generateLength = lastUserInList ? length - 1 : length;
    for (i=0; i<generateLength;i++) {
        temp.push(i);
        result.push(i);
    }

    let resultIndex = 0;
    while (temp.length > 0) {
        let index = Math.floor(Math.random() * temp.length);
        result[resultIndex++] = temp[index];
        temp.splice(index,1);
    }
    if (lastUserInList) {
        result.push(result.length);
    }
    return result;
}

/*
    Create members from custom list
 */
function create_custom_members() {
    var parent = document.querySelector('#custom_members');
    let members = ["Влад", "Лена", "Вика", "Саша С.", "Саша Ш.", "Антон", "Никита", "Ира", "Катя", "Маша", "Миша"];
    members.forEach(function (item, index) {
        let div = document.createElement('div');
        div.innerHTML =
            `<input type="text" class="form-control name_input" aria-describedby="button-addon" id="in_${index}" value="${item}">
        <div class="input-group-append">
            <input type="checkbox" class="custom_toggle_button" id="tb_${index}" checked>
        </div>`;
        div.setAttribute('class', 'input-group mb-3');
        parent.appendChild(div);
    });
}


/*
    Reset all members - set all visible and remove member from center
 */
function reset() {
    showIndex = -1;
    updateOrder();

    let elements = document.getElementById("chips").getElementsByTagName("a");
    elements.forEach(function (item) {
        if (item.classList.contains("animated")) {
            item.classList.remove("animated");
        }
        if (item.classList.contains("fadeOut")) {
            item.classList.remove("fadeOut");
        }
    });
    remove_member_center();
}