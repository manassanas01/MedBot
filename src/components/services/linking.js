const config = {
    screens: {
        Home: {
            path: "home/",
        }/*,
        NoteDetail: {
            path: "note/:m/:id/",
            parse: {
              id: (id) => `${id}`,
              userid: (userid) => `${userid}`,
              m: (m) => `${m}`,
            },
          },*/
    }
}
/* npx uri-scheme open http://notes101.com/note/edit/78?userid=4 --android */

const linking = {
    prefixes: ['http://notes101.com/', 'http://app.notes101.com/'],
    config
};

export default linking;