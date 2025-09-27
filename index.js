import Community from "./community.js";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const names = [];
for (const first of letters) {
  for (const last of letters) {
    names.push(first + last);
    if (names.length >= 100)
      break;
  }
  if (names.length >= 100)
    break;
}

async function retrieve_data() {
  const communities = {};
  for (const [index, community] of (await (await fetch(new Request("https://t0ronto.ca/all.json")))
    .json())
    .communities.map(({ name }) => name).slice(5, 10).entries()) {
    communities[community] = names.slice(20 * index, 20 * (index + 1));
    for (let index2 = index; index2 < 100; index2 += 5)
      if (!communities[community].includes(names[index2]))
        communities[community].push(names[index2]);
  }

  return communities;
}

async function update(event) {
  const selected = event.target.children[event.target.selectedIndex].value;
  console.log(selected);

  const map = {};
  for (const name of names)
    if (name !== selected)
      map[name] = 0;
  for (const community of document.getElementById("communities").children)
    if (community.members.includes(selected))
      for (const member of community.members)
        if (member !== selected) 
          map[member] += 1;

  const ranking = document.getElementById("ranking");
  ranking.innerHTML = "";
  for (const [name, count] of Object.entries(map).sort(([A, a], [B, b]) => b - a)) {
    const item = document.createElement("li");
    item.innerText = `${name} [${count}]`;
    ranking.appendChild(item);
  }
}

async function main() {
  const data = await retrieve_data();
  for (const [community, names] of Object.entries(data)) {
    const element = new Community;
    const title = document.createElement("span");
    title.setAttribute("slot", "title");
    title.innerText = community;
    element.appendChild(title);

    const select = document.getElementById("select");
    for (const name of names) {
      const member = document.createElement("li");
      member.setAttribute("slot", "member");
      member.innerText = name;
      element.appendChild(member);

      const person = document.createElement("option");
      person.setAttribute("value", name);
      person.textContent = name;
      select.appendChild(person);
    }
    document.getElementById("communities").appendChild(element);
  }

  document.getElementById("select").onchange = update;
}
main();
