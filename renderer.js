
window.api.run();
window.api.receive("fromMain", (documentId, data) => {
    document.getElementById(documentId).innerHTML = data;
});
