# DuaOnDevice — attribution and provenance

## Canonical corpus
DuaOnDevice v1.x contains 199 canonical records: 74 Quran records, 122 Prophetic Sunnah records, and 3 Companion/Athar records. Every canonical record carries a human-readable source citation and at least one source/verification link in `data/duas.json`.

DuaOnDevice distinguishes **source verification** from **hadith grading**. Verification means the Arabic/source route was checked against the cited route used by the corpus. The app does not independently re-grade hadith. Where a source/edition or named scholar reports a grade, that grading is preserved in the record; retained weak-status reports remain visibly labeled as weak.

## Quran records
Quran records reuse the accepted AyahOnDevice Quran source layer:
- Uthmani Quran source text: Tanzil-derived accepted Quran data;
- IndoPak display text: DigitalKhatt-derived accepted source data;
- English meaning: QuranEnc Rowwad English v1.0.19;
- Bengali meaning: QuranEnc Rowwad Bengali v1.1.2.

Quran records carry direct Quran.com reference links for user verification. The reference link is a convenience route; the bundled display/source data remains the curated local corpus described above.

## Prophetic Sunnah records
Prophetic Sunnah records were checked against their cited source routes. The canonical records carry source names/numbers, Arabic, preserved grading information where available, and verification links. Most verification routes point to Sunnah.com, with additional routes such as Dorar where appropriate.

## Companion/Athar records
Companion/Athar entries remain explicitly classified as Athar rather than Prophetic Sunnah. Their attribution, source route, and grading/context notes are preserved with the record.

## Transliteration and meaning aids
English romanization, Bengali-script pronunciation aids, and editorial meaning fields are **reading aids**. They do not replace the canonical Arabic/source provenance and should not be treated as independently revealed/source text.

## Smart Search — v1.1+
DuaOnDevice v1.1 adds optional local semantic retrieval using **Multilingual E5 Small**:
- runtime model id: `Xenova/multilingual-e5-small`;
- upstream model: `intfloat/multilingual-e5-small`;
- upstream model license: MIT;
- browser runtime: `@huggingface/transformers` 3.8.1, Apache-2.0;
- execution path: single-thread WASM in a dedicated Web Worker.

The model and runtime are downloaded separately when Smart Search is prepared. Model weights are not committed to this repository. The shipped E5 document-vector index is derived from the canonical DuaOnDevice corpus and contains embeddings, not replacement religious text.

Official/upstream references:
- https://huggingface.co/intfloat/multilingual-e5-small
- https://huggingface.co/Xenova/multilingual-e5-small
- https://github.com/huggingface/transformers.js

## Companion project
DuaOnDevice is positioned as a companion to AyahOnDevice:
- https://github.com/NivareQ/AyahOnDevice

AyahOnDevice focuses on identifying Quran Ayat and reading the Quran locally; DuaOnDevice focuses on a source-traceable Dua reference collection and personal Dua workflow.
