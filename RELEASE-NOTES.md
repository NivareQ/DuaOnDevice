# DuaOnDevice v1.1.0 — Smart Search

DuaOnDevice v1.1.0 adds optional fully local semantic retrieval while preserving the v1.0 canonical 199-record corpus.

## Smart Search
- Multilingual E5 Small only;
- q8 browser model path;
- single-thread WASM only;
- dedicated Web Worker for model/inference work;
- shipped precomputed 199-record document-vector index bound to the canonical corpus;
- deterministic exact/context/transliteration safeguards remain in the retrieval path;
- My Duas remain separate and lexical/local-only;
- model retrieves likely records and never generates or rewrites religious text.

## Preserved
The canonical corpus composition, source links, Arabic/source provenance, Saved/My Duas behavior, personal-data foundation, themes, and core religious-text integrity rules remain preserved from v1.0.

## Companion project
DuaOnDevice is the companion reference app to AyahOnDevice: https://github.com/NivareQ/AyahOnDevice
