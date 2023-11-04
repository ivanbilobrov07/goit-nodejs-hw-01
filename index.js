const { program } = require("commander");

const contacts = require("./contacts/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.log(await contacts.getContacts());
      break;

    case "get":
      console.log(await contacts.getContactById(id));
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log("\x1B[31m Missing params for adding a contact");
        break;
      }

      console.log(await contacts.addContact({ name, email, phone }));
      break;

    case "remove":
      console.log(await contacts.removeContact(id));
      break;

    case "edit":
      const params = { id, name, email, phone };

      if (!name) {
        delete params.name;
      }
      if (!email) {
        delete params.email;
      }
      if (!phone) {
        delete params.phone;
      }

      console.log(await contacts.editContact(params));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(program.argv);

const options = program.opts();

invokeAction(options);
