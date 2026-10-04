# Third-party notices

DuaOnDevice itself is a static web application. v1.1 optionally loads third-party machine-learning resources at runtime for local semantic retrieval.

- **Transformers.js / `@huggingface/transformers` 3.8.1** — Apache License 2.0. Upstream: https://github.com/huggingface/transformers.js
- **Multilingual E5 Small** — MIT according to the upstream model card. Upstream: https://huggingface.co/intfloat/multilingual-e5-small
- **Xenova browser conversion of Multilingual E5 Small** — runtime model route used by the application: https://huggingface.co/Xenova/multilingual-e5-small

The E5 model weights and Transformers.js package are fetched separately at runtime and are not stored in this repository snapshot.

The application-level `MODEL-LICENSES.txt` provides the model notice shown with the shipped app.
