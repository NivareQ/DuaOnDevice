# DuaOnDevice

**A NivareQ™ project**  
**Version 1.1.0 — Smart Search**

> **Authentic Duas, available fully offline and on-device — with verifiable sources.**

DuaOnDevice is a provenance-first local Dua reference app. It ships the same curated canonical collection of **199 records: 74 Quran, 122 Prophetic Sunnah, and 3 Companion/Athar** entries, with traceable source references for every canonical record.

**Companion app:** [AyahOnDevice](https://github.com/NivareQ/AyahOnDevice) — NivareQ's local Quran Ayah identification and reader project.

## Source transparency
Every canonical record includes a source citation and source link. Arabic/source provenance is treated as authoritative; English and Bengali transliterations and meanings are clearly separated reading aids. Where a Sunnah/Athar record has a reported grade, DuaOnDevice preserves that grading rather than silently upgrading it. Transparently labeled weak-status reports remain labeled as such.

## Smart Search in v1.1
Smart Search is an **optional retrieval convenience**, not a religious-text generator. It uses Multilingual E5 Small locally in the browser to understand natural English/Bengali search intent and rank likely records. The model **never generates, rewrites, or replaces** Quran, Sunnah, Athar, transliteration, or meaning text.

The v1.1 production path is deliberately narrow:
- `Xenova/multilingual-e5-small` / upstream `intfloat/multilingual-e5-small`;
- q8 browser representation;
- single-thread WASM only;
- neural work isolated in a dedicated Web Worker;
- a precomputed, corpus-hash-bound 199-record document-vector index ships with the app;
- only the user's query needs neural embedding during normal search;
- deterministic exact/context/transliteration safeguards remain in the retrieval path;
- My Duas remain local lexical search and are not added to the canonical neural index.

The E5 model is downloaded separately when Smart Search is prepared; model weights are not stored in this repository. After the required resources are cached, Smart Search can run locally without sending search text to a cloud inference service.

## Highlights
- 199 canonical source-traceable Dua records;
- Quran, Prophetic Sunnah, and Companion/Athar provenance kept distinct;
- Uthmani and IndoPak Quran display where applicable;
- English and বাংলা transliteration and meaning aids;
- deterministic bilingual search plus optional on-device Smart Search;
- Saved items with personal titles and notes;
- user-created **My Duas** kept separate from the canonical corpus;
- versioned personal backup/restore;
- nine themes and installable PWA behavior.

## Privacy and religious-text integrity
Canonical religious text comes only from the bundled curated data. Smart Search returns records from that corpus; it does not author religious text. Personal Saved notes, My Duas, preferences, and search-related local state remain on the device unless you explicitly export a backup.

## Offline use
The canonical corpus and precomputed document index ship with the app. Initial Smart Search preparation requires network access to obtain the browser runtime/model resources. After those resources are cached, the app can use the local model and shipped vector index offline.

## Deploy
This repository is a deployable static app; no application build step is required. Serve the repository root over HTTPS.

The accepted application itself intentionally carries `noindex`/`robots.txt` restrictions. Public discovery should therefore come through the NivareQ website and repository unless that policy is deliberately changed in a later bounded release.

## Attribution and third-party notices
See [`ATTRIBUTION.md`](ATTRIBUTION.md), [`CONTENT-NOTICE.md`](CONTENT-NOTICE.md), [`MODEL-LICENSES.txt`](MODEL-LICENSES.txt), and [`THIRD_PARTY_LICENSES/`](THIRD_PARTY_LICENSES/).

## License
Unless otherwise noted, **original DuaOnDevice application source code** is licensed under the Apache License 2.0. See [`LICENSE`](LICENSE).

The root software license does **not** relicense third-party Quran text, translations, cited source material, model/runtime resources, trademarks, or other third-party content. See `CONTENT-NOTICE.md` and `ATTRIBUTION.md`.

The Apache License 2.0 does not grant rights to use NivareQ™ or DuaOnDevice names, logos, or branding except as permitted by applicable law.
