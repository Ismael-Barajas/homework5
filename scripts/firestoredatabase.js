(function (window) {
    'use strict';

    var App = window.App || {};
    
    class FireStoreData {
        constructor() {
            firebase.initializeApp(window.App.FirebaseConfig);
            this.firestore = firebase.firestore();
        }

        async add(key, val) {
            return this.firestore.collection("coffeeorders").add(val);
        }

        async get(key, val) {
            var locate = await this.firestore.collection("coffeeorders")
                .where("emailAddress", "==", key).get();
            return locate.docs.map((contents) => {
                return contents.data();
            });
        }

        async getAll(key) {
            var locateAll = await this.firestore.collection("coffeeorder").get();
            return locateAll.docs.map((contents) => {
                return contents.data();
            });
        }

        async remove(key) {
            var removingDoc = await this.firestore.collection("coffeeorder")
                .where("emailAddress", "==", key);
            removingDoc.get().then((snapshot) => {
                snapshot.forEach(doc => {
                    doc.ref.delete();
                });
            });
        }
    }
    App.FireStoreData = FireStoreData;
    window.App = App;
})(window);