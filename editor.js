(() => {
    const { TABS, TOOLS } = window.FilerobotImageEditor;

    window.openImageEditor = function(url) {
        const config = {
            source: url,
            typography: {
                fontFamily: 'Helvetica Neue, Roboto, Arial',
            },
            defaultSavedImageType: 'png',
            defaultSavedImageName: `screenshot-${formatCurrentDate()}`,
            useCloudImage: false,

            onSave: editedImageObject => {
                const a = document.createElement('a');
                a.download = editedImageObject.fullName;
                a.href = editedImageObject.imageBase64;
                a.click();
            },

            annotationsCommon: {
                fill: '#8800ff',
                stroke: '#8800ff',
            },
            text: {
                text: 'Example text',
            },

            tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.FILTERS, TABS.FINETUNE, TABS.WATERMARK],
            defaultTabId: TABS.ANNOTATE,
            defaultToolId: TOOLS.ARROW,
        };

        const imageEditor = new window.FilerobotImageEditor(
            document.querySelector('#editor'),
            config,
        );
        showEditor();

        imageEditor.render({
            onClose: () => {
                imageEditor.terminate();
                hideEditor();
            },
        });
    }

    function showEditor() {
        document.getElementById('editor').style = 'display: block';
    }

    function hideEditor() {
        document.getElementById('editor').style = 'display: none';
    }

    function formatCurrentDate() {
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${zeroPadDate(currentDate.getMonth())}-${zeroPadDate(currentDate.getDate())}`;
        const time = `${zeroPadDate(currentDate.getHours())}-${zeroPadDate(currentDate.getMinutes())}-${zeroPadDate(currentDate.getSeconds())}`;
        return `${date}-${time}`;
    }

    function zeroPadDate(x) {
        return x >= 10 ? x : '0' + x;
    }

})();
