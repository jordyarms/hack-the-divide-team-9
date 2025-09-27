import Community from "./community.js";

async function retrieve_data() {
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

async function main() {
  const data = await retrieve_data();
  for (const [community, names] of Object.entries(data)) {
    const element = new Community;
    const title = document.createElement("span");
    title.setAttribute("slot", "title");
    title.innerText = community;
    element.appendChild(title);
    for (const name of names) {
      const member = document.createElement("li");
      member.setAttribute("slot", "member");
      member.innerText = name;
      element.appendChild(member);
    }
    document.body.appendChild(element);
  }
}
main();
