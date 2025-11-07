sap.ui.define([], function () {
    "use strict";

    const JSON_MIME_TYPE = "application/json";
    const PROBLEM_JSON_MIME_TYPE = "application/problem+json";
    const XML_MIME_TYPE = "application/xml";
    const PROBLEM_XML_MIME_TYPE = "application/problem+xml";

    return {
        lerCorpo: function (response) {
            const nomeDoHeader = "content-type";
            let contentTypeData = response.headers.get(nomeDoHeader);
            var contentType = null;
            const indiceInvalido = -1;

            if (contentTypeData && (contentTypeData.indexOf(JSON_MIME_TYPE) !== indiceInvalido || contentTypeData.indexOf(PROBLEM_JSON_MIME_TYPE) !== indiceInvalido)) {
                contentType = JSON_MIME_TYPE;
            }

            if (contentTypeData && (contentTypeData.indexOf(XML_MIME_TYPE) !== indiceInvalido || contentTypeData.indexOf(PROBLEM_XML_MIME_TYPE) !== indiceInvalido)) {
                contentType = XML_MIME_TYPE;
            }

            if (!contentType) {
                return Promise.resolve();
            }

            const reader = response.body.getReader();
            let stream = new ReadableStream({
                start(controller) {
                    function push() {
                        reader
                            .read()
                            .then(({
                                done,
                                value
                            }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            });
                    }
                    push();
                }
            });

            return new Response(
                stream, {
                headers: {
                    "Content-Type": contentType
                }
            }
            ).json();
        },
    }
});