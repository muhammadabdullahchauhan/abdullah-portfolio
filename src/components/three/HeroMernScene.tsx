import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";

// ── SVG logos embedded as base64 data URIs ──────────────────────────────────
const REACT_SVG = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTE4LjY3ODkgMTUuOTc1OUMxOC42Nzg5IDE0LjU0MTUgMTcuNDc5NiAxMy4zNzg1IDE2IDEzLjM3ODVDMTQuNTIwNiAxMy4zNzg1IDEzLjMyMTEgMTQuNTQxNSAxMy4zMjExIDE1Ljk3NTlDMTMuMzIxMSAxNy40MTA1IDE0LjUyMDYgMTguNTczNCAxNiAxOC41NzM0QzE3LjQ3OTYgMTguNTczNCAxOC42Nzg5IDE3LjQxMDUgMTguNjc4OSAxNS45NzU5WiIgZmlsbD0iIzUzQzFERSIvPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNC43MDA0IDExLjE1MzdDMjUuMjY2MSA4LjkyNDc4IDI1Ljk3NzIgNC43OTE0OCAyMy40NzA0IDMuMzkwMTZDMjAuOTc1MyAxLjk5NDk1IDE3LjcyODQgNC42Njg0MyAxNi4wMTM5IDYuMjczMThDMTQuMzA0NCA0LjY4NDQyIDEwLjk2NjMgMi4wMjIzNyA4LjQ2MTYzIDMuNDI4MTRDNS45Njc1MSA0LjgyODAzIDYuNzM2NjQgOC44OTI4IDcuMzE0OSAxMS4xMzU3QzQuOTg4MzEgMTEuNzc2NCAxIDEzLjE1NjQgMSAxNS45NzU5QzEgMTguNzg3NCA0Ljk4NDE2IDIwLjI4ODggNy4yOTY5OCAyMC45Mjg5QzYuNzE2NTggMjMuMTg0MiA1Ljk4NTk2IDI3LjE5MDkgOC40ODMyNyAyOC41ODc3QzEwLjk5NzMgMjkuOTkzMiAxNC4zMjUgMjcuMzk0NSAxNi4wNTU0IDI1Ljc3MjJDMTcuNzgwOSAyNy4zODY0IDIwLjk5NjYgMzAuMDAyMSAyMy40OTIyIDI4LjYwMTRDMjUuOTk1NiAyNy4xOTYzIDI1LjM0MzYgMjMuMTE4NCAyNC43NjUzIDIwLjg2MjVDMjcuMDA3MyAyMC4yMjEgMzEgMTguNzUyMyAzMSAxNS45NzU5QzMxIDEzLjE4MzUgMjYuOTkwMyAxMS43OTIzIDI0LjcwMDQgMTEuMTUzN1pNMjQuNDE2MiAxOS42NjdDMjQuMDM2NSAxOC41MDE2IDIzLjUyNCAxNy4yNjIzIDIyLjg5NzEgMTUuOTgyMUMyMy40OTU1IDE0LjczMjEgMjMuOTg4MSAxMy41MDg4IDI0LjM1NzIgMTIuMzUwOUMyNi4wMzU5IDEyLjgyMjggMjkuNzE4NSAxMy45MDEzIDI5LjcxODUgMTUuOTc1OUMyOS43MTg1IDE4LjA3IDI2LjE4NDYgMTkuMTU4NyAyNC40MTYyIDE5LjY2N1pNMjIuODUgMjcuNTI2QzIwLjk4OCAyOC41NzEgMTguMjIyMSAyNi4wNjk2IDE2Ljk0NzggMjQuODgwOUMxNy43OTMyIDIzLjk4NDQgMTguNjM4IDIyLjk0MjIgMTkuNDYyNSAyMS43ODQ5QzIwLjkxMjkgMjEuNjYwMiAyMi4yODMgMjEuNDU2MiAyMy41MjU2IDIxLjE3NzdDMjMuOTMyNiAyMi43NzM0IDI0LjcyMDIgMjYuNDc2MyAyMi44NSAyNy41MjZaTTkuMTIzNjIgMjcuNTExMUM3LjI2MTQzIDI2LjQ3IDguMTEyNTggMjIuODk0NiA4LjUzOTU3IDIxLjIzMzNDOS43NjgzNCAyMS40OTY5IDExLjEyODYgMjEuNjg2NSAxMi41ODI0IDIxLjgwMDhDMTMuNDEyMyAyMi45MzMyIDE0LjI4MTYgMjMuOTc0MSAxNS4xNTc2IDI0Ljg4NTdDMTQuMDc1MyAyNS45MDA4IDEwLjk5NDUgMjguNTU3IDkuMTIzNjIgMjcuNTExMVpNMi4yODE0OSAxNS45NzU5QzIuMjgxNDkgMTMuODc0IDUuOTQyMDcgMTIuODAzMyA3LjY1OTA0IDEyLjMzMjZDOC4wMzQ1MSAxMy41MTY1IDguNTI2OTUgMTQuNzU0NCA5LjEyMTIzIDE2LjAwNjJDOC41MTkyNSAxNy4yNzY2IDguMDE5NzcgMTguNTM0MSA3LjY0MDg1IDE5LjczMkM2LjAwMzY5IDE5LjI3NzYgMi4yODE0OSAxOC4wNzkxIDIuMjgxNDkgMTUuOTc1OVpNOS4xMDM3IDQuNTAzNTRDMTAuOTczNSAzLjQ1NDE2IDEzLjg3NDcgNi4wMDk4MyAxNS4xMTU5IDcuMTYwMTNDMTQuMjQ0NCA4LjA2NzU0IDEzLjM4MzEgOS4xMDA2IDEyLjU2MDMgMTAuMjI2NUMxMS4xNDk0IDEwLjM1MzMgOS43OTg3NSAxMC41NTY5IDguNTU3MDkgMTAuODI5N0M4LjA5MTI1IDkuMDIwNzEgNy4yMzU5MiA1LjU1MTc5IDkuMTAzNyA0LjUwMzU0Wk0yMC4zNzkzIDExLjU3NzFDMjEuMzM2NSAxMS42OTQyIDIyLjI1MzYgMTEuODUgMjMuMTE0NyAxMi4wNDA2QzIyLjg1NjIgMTIuODQ0IDIyLjUzNCAxMy42ODQxIDIyLjE1NDUgMTQuNTQ1M0MyMS42MDQ0IDEzLjUzMzMgMjEuMDEzOSAxMi41NDE2IDIwLjM3OTMgMTEuNTc3MVpNMTYuMDE0MyA4LjA0ODFDMTYuNjA1NCA4LjY2ODk3IDE3LjE5NzQgOS4zNjIzIDE3Ljc3OTggMTAuMTE0NUMxNi41OTg1IDEwLjA2MDMgMTUuNDE1MyAxMC4wNjAxIDE0LjIzNCAxMC4xMTM3QzE0LjgxNjkgOS4zNjg0OCAxNS40MTQgOC42NzYxOCAxNi4wMTQzIDguMDQ4MVpNOS44NTY1IDE0LjU0NDRDOS40ODMyOSAxMy42ODYyIDkuMTYzOTggMTIuODQyNCA4LjkwMzIyIDEyLjAyNzVDOS43NTkxOCAxMS44NDE4IDEwLjY3MiAxMS42OSAxMS42MjMgMTEuNTc0OEMxMC45ODY2IDEyLjUzNzIgMTAuMzk3MSAxMy41Mjg1IDkuODU2NSAxNC41NDQ0Wk0xMS42NTAzIDIwLjQ2NTdDMTAuNjY3OSAyMC4zNTk0IDkuNzQxMjYgMjAuMjE1MyA4Ljg4NTU2IDIwLjAzNDdDOS4xNTA0NCAxOS4yMDU1IDkuNDc2NzggMTguMzQzNSA5Ljg1Nzk2IDE3LjQ2NjhDMTAuNDA2IDE4LjQ5MzMgMTEuMDA0NSAxOS40OTQyIDExLjY1MDMgMjAuNDY1N1pNMTYuMDQ5OCAyMy45OTE1QzE1LjQ0MjQgMjMuMzU2IDE0LjgzNjUgMjIuNjUzMSAxNC4yNDQ4IDIxLjg5NzFDMTUuNDMyOCAyMS45NDIzIDE2LjYyMzEgMjEuOTQyNCAxNy44MTEgMjEuODkxQzE3LjIyNjggMjIuNjYwOCAxNi42MzY5IDIzLjM2NDcgMTYuMDQ5OCAyMy45OTE1Wk0yMi4xNjY3IDE3LjQyMjJDMjIuNTY3NyAxOC4zMDg0IDIyLjkwNTcgMTkuMTY1NyAyMy4xNzQyIDE5Ljk4MDlDMjIuMzA0MyAyMC4xNzM0IDIxLjM2NTIgMjAuMzI4NCAyMC4zNzU3IDIwLjQ0MzVDMjEuMDE1IDE5LjQ2MDcgMjEuNjE0OSAxOC40NTM2IDIyLjE2NjcgMTcuNDIyMlpNMTguNzQ3MyAyMC41OTQxQzE2LjkzMDEgMjAuNzIgMTUuMTAxNiAyMC43MTg2IDEzLjI4MzggMjAuNjA0NEMxMi4yNTA5IDE5LjE0MTUgMTEuMzMxNCAxNy42MDMgMTAuNTM3NyAxNi4wMDU4QzExLjMyNzYgMTQuNDExOSAxMi4yNDA0IDEyLjg3NjQgMTMuMjY4NCAxMS40MTU4QzE1LjA4NzUgMTEuMjgyNSAxNi45MTc4IDExLjI4MjEgMTguNzM2OSAxMS40MTY2QzE5Ljc1NjEgMTIuODc3MSAyMC42Njc1IDE0LjQwODYgMjEuNDc1NyAxNS45ODgxQzIwLjY3NzEgMTcuNTgxMiAxOS43NTk1IDE5LjExOTggMTguNzQ3MyAyMC41OTQxWk0yMi44MzAzIDQuNDY2NkMyNC43MDA2IDUuNTEyNTQgMjMuODY4MSA5LjIyNzI2IDIzLjQ1OTUgMTAuODQyNkMyMi4yMTQ5IDEwLjU2NDEgMjAuODYzMyAxMC4zNTY5IDE5LjQ0ODMgMTAuMjI4MUMxOC42MjM5IDkuMDkwMDQgMTcuNzY5OCA4LjA1NTE4IDE2LjkxMjQgNy4xNTk0OUMxOC4xNjk1IDUuOTg0NDEgMjAuOTc4MSAzLjQzMDg5IDIyLjgzMDMgNC40NjY2WiIgZmlsbD0iIzUzQzFERSIvPg0KPC9zdmc+";
const EXPRESS_SVG = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiNmZmZmZmYiIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI0IDE4LjU4OGExLjUyOSAxLjUyOSAwIDAgMS0xLjg5NS0uNzJsLTMuNDUtNC43NzEtLjUtLjY2Ny00LjAwMyA1LjQ0NGExLjQ2NiAxLjQ2NiAwIDAgMS0xLjgwMi43MDhsNS4xNTgtNi45Mi00Ljc5OC02LjI1MWExLjU5NSAxLjU5NSAwIDAgMSAxLjkuNjY2bDMuNTc2IDQuODMgMy41OTYtNC44MWExLjQzNSAxLjQzNSAwIDAgMSAxLjc4OC0uNjY4TDIxLjcwOCA3LjlsLTIuNTIyIDMuMjgzYS42NjYuNjY2IDAgMCAwIDAgLjk5NGw0LjgwNCA2LjQxMnpNLjAwMiAxMS41NzZsLjQyLTIuMDc1YzEuMTU0LTQuMTAzIDUuODU4LTUuODEgOS4wOTQtMy4yNyAxLjg5NSAxLjQ4OSAyLjM2OCAzLjU5NyAyLjI3NSA1Ljk3M0gxLjExNkMuOTQzIDE2LjQ0NyA0LjAwNSAxOS4wMDkgNy45MiAxNy43YTQuMDc4IDQuMDc4IDAgMCAwIDIuNTgyLTIuODc2Yy4yMDctLjY2Ni41NDgtLjc4IDEuMTc0LS41ODhhNS40MTcgNS40MTcgMCAwIDEtMi41ODkgMy45NTcgNi4yNzIgNi4yNzIgMCAwIDEtNy4zMDYtLjkzMyA2LjU3NSA2LjU3NSAwIDAgMS0xLjY0LTMuODU4YzAtLjIzNS0uMDgtLjQ1NS0uMTM0LS42NjZBODguMzMgODguMzMgMCAwIDEgMCAxMS41Nzd6bTEuMTI3LS4yODZoOS42NTRjLS4wNi0zLjA3Ni0yLjAwMS01LjI1OC00LjU5LTUuMjc4LTIuODgyLS4wNC00Ljk0NCAyLjA5NC01LjA3MSA1LjI2NHoiLz48L3N2Zz4=";
const NODE_SVG = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSItMTMgMCAyODIgMjgyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiPgoNPGcgZmlsbD0iIzhDQzg0QiI+Cg08cGF0aCBkPSJNMTE2LjUwNCAzLjU4YzYuOTYyLTMuOTg1IDE2LjAzLTQuMDAzIDIyLjk4NiAwIDM0Ljk5NSAxOS43NzQgNzAuMDAxIDM5LjUxNyAxMDQuOTkgNTkuMzAzIDYuNTgxIDMuNzA3IDEwLjk4MyAxMS4wMzEgMTAuOTE2IDE4LjYxNHYxMTguOTY4Yy4wNDkgNy44OTctNC43ODggMTUuMzk2LTExLjczMSAxOS4wMTktMzQuODggMTkuNjY1LTY5Ljc0MiAzOS4zNTQtMTA0LjYxNiA1OS4wMTktNy4xMDYgNC4wNjMtMTYuMzU2IDMuNzUtMjMuMjQtLjY0Ni0xMC40NTctNi4wNjItMjAuOTMyLTEyLjA5NC0zMS4zOS0xOC4xNS0yLjEzNy0xLjI3NC00LjU0Ni0yLjI4OC02LjA1NS00LjM2IDEuMzM0LTEuNzk4IDMuNzE5LTIuMDIyIDUuNjU3LTIuODA3IDQuMzY1LTEuMzg4IDguMzc0LTMuNjE2IDEyLjM4NC01Ljc3OCAxLjAxNC0uNjk0IDIuMjUyLS40MjggMy4yMjQuMTkzIDguOTQyIDUuMTI3IDE3LjgwNSAxMC40MDMgMjYuNzc3IDE1LjQ4MSAxLjkxNCAxLjEwNSAzLjg1Mi0uMzYyIDUuNDg4LTEuMjc0IDM0LjIyOC0xOS4zNDUgNjguNDk4LTM4LjYxNyAxMDIuNzItNTcuOTY4IDEuMjY4LS42MSAxLjk2OS0xLjk1NiAxLjg2Ni0zLjM0NS4wMjQtMzkuMjQ1LjAwNi03OC40OTcuMDEyLTExNy43NDIuMTQ1LTEuNTc2LS43NjctMy4wMjUtMi4xOTItMy42Ny0zNC43NTktMTkuNTc1LTY5LjUtMzkuMTgtMTA0LjI1My01OC43NmEzLjYyMSAzLjYyMSAwIDAgMC00LjA5NC0uMDA2QzkxLjIgMzkuMjU3IDU2LjQ2NSA1OC44OCAyMS43MTIgNzguNDU0Yy0xLjQyLjY0Ni0yLjM3MyAyLjA3MS0yLjIwNCAzLjY1My4wMDYgMzkuMjQ1IDAgNzguNDk3IDAgMTE3Ljc0OGEzLjMyOSAzLjMyOSAwIDAgMCAxLjg5IDMuMzAzYzkuMjc0IDUuMjU5IDE4LjU2IDEwLjQ4MSAyNy44NCAxNS43MjIgNS4yMjggMi44MTQgMTEuNjQ3IDQuNDg2IDE3LjQwNyAyLjMzIDUuMDgzLTEuODIzIDguNjQ2LTcuMDEgOC41NDktMTIuNDA3LjA0OC0zOS4wMTYtLjAyNC03OC4wMzguMDM2LTExNy4wNDgtLjEyNy0xLjczMiAxLjUxNi0zLjE2MyAzLjItMyA0LjQ1Ni0uMDMgOC45MTgtLjA2IDEzLjM3NC4wMTIgMS44Ni0uMDQyIDMuMTQgMS44MjMgMi45MSAzLjU2OC0uMDE4IDM5LjI2My4wNDggNzguNTI3LS4wMyAxMTcuNzkuMDEyIDEwLjQ2NC00LjI4NyAyMS44NS0xMy45NjYgMjYuOTctMTEuOTI0IDYuMTc3LTI2LjY2MiA0Ljg2Ny0zOC40NDItMS4wNTYtMTAuMTk4LTUuMDktMTkuOTMtMTEuMDk3LTI5Ljk0Ny0xNi41NUM1LjM2OCAyMTUuODg2LjU1NSAyMDguMzU3LjYwNCAyMDAuNDY2VjgxLjQ5N2MtLjA3My03Ljc0IDQuNTA0LTE1LjE5NyAxMS4yOS0xOC44NUM0Ni43NjggNDIuOTY2IDgxLjYzNiAyMy4yNyAxMTYuNTA0IDMuNTh6Ii8+Cg08cGF0aCBkPSJNMTQ2LjkyOCA4NS45OWMxNS4yMS0uOTc5IDMxLjQ5My0uNTggNDUuMTggNi45MTMgMTAuNTk3IDUuNzQyIDE2LjQ3MiAxNy43OTMgMTYuNjU5IDI5LjU2Ni0uMjk2IDEuNTg4LTEuOTU2IDIuNDY0LTMuNDcyIDIuMzU1LTQuNDEzLS4wMDYtOC44MjcuMDYtMTMuMjQtLjAzLTEuODcyLjA3Mi0yLjk2LTEuNjU0LTMuMTk1LTMuMzA5LTEuMjY4LTUuNjMzLTQuMzQtMTEuMjEyLTkuNjQyLTEzLjkyOS04LjEzOS00LjA3NS0xNy41NzYtMy44Ny0yNi40NTEtMy43ODUtNi40NzkuMzQ0LTEzLjQ0Ni45MDUtMTguOTM1IDQuNzE1LTQuMjE0IDIuODg2LTUuNDk0IDguNzEyLTMuOTkgMTMuNDA0IDEuNDE4IDMuMzY5IDUuMzA3IDQuNDU2IDguNDg5IDUuNDU4IDE4LjMzIDQuNzk0IDM3Ljc1NCA0LjMxNyA1NS43MzQgMTAuNjI2IDcuNDQ0IDIuNTcyIDE0LjcyNiA3LjU3MiAxNy4yNzQgMTUuMzY2IDMuMzMzIDEwLjQ0NiAxLjg3MiAyMi45MzItNS41NiAzMS4zMTgtNi4wMjcgNi45MDEtMTQuODA1IDEwLjY1Ny0yMy41NiAxMi42OTctMTEuNjQ3IDIuNTk3LTIzLjczNCAyLjY2My0zNS41NjIgMS41MS0xMS4xMjItMS4yNjgtMjIuNjk2LTQuMTktMzEuMjgyLTExLjc2OC03LjM0Mi02LjM3NS0xMC45MjgtMTYuMzA4LTEwLjU3Mi0yNS44OTUuMDg1LTEuNjE5IDEuNjk3LTIuNzQ4IDMuMjQ4LTIuNjE1IDQuNDQ0LS4wMzYgOC44ODgtLjA0OCAxMy4zMzIuMDA2IDEuNzc1LS4xMjcgMy4wOTEgMS40MDcgMy4xODIgMy4wOC44MiA1LjM2NyAyLjgzNyAxMSA3LjUxNyAxNC4xODIgOS4wMzIgNS44MjcgMjAuMzY1IDUuNDI4IDMwLjcwNyA1LjU5MSA4LjU2OC0uMzggMTguMTg2LS40OTUgMjUuMTc4LTYuMTU4IDMuNjg5LTMuMjMgNC43ODItOC42MzQgMy43ODUtMTMuMjgzLTEuMDgtMy45MjUtNS4xODYtNS43NTQtOC43MTItNi45NS0xOC4wOTUtNS43MjQtMzcuNzM2LTMuNjQ3LTU1LjY1Ni0xMC4xMi03LjI3NS0yLjU3MS0xNC4zMS03LjQzMi0xNy4xMDUtMTQuOTA2LTMuOS0xMC41NzgtMi4xMTMtMjMuNjYyIDYuMDk4LTMxLjc2NSA4LjAwNi04LjA2IDE5LjU2My0xMS4xNjQgMzAuNTUxLTEyLjI3NXoiLz4KDTwvZz4KDTwvc3ZnPg==";
const MONGO_SVG = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgNzMgNzMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgDQogICAgPHRpdGxlPmRhdGFiYXNlcy1hbmQtc2VydmVycy9kYXRhYmFzZXMvbW9uZ29kYjwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+Cg08L2RlZnM+DQogICAgPGcgaWQ9ImRhdGFiYXNlcy1hbmQtc2VydmVycy9kYXRhYmFzZXMvbW9uZ29kYiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIGlkPSJjb250YWluZXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAyLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMTM0NTE0IiBzdHJva2Utd2lkdGg9IjIiPg0KICAgICAgICAgICAgPHJlY3QgaWQ9Im1hc2siIHg9Ii0xIiB5PSItMSIgd2lkdGg9IjcxIiBoZWlnaHQ9IjcxIiByeD0iMTQiPgoNPC9yZWN0Pg0KICAgICAgICA8L2c+DQogICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUuMDAwMDAwLCAxMS4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPg0KICAgICAgICAgICAgPHBhdGggZD0iTTEyLjQ5NDQ3NzUsNTAuNzI4MjI3NSBMMTEuMTQ2MDQ0OSw1MC4yNjczNDM4IEMxMS4xNDYwNDQ5LDUwLjI2NzM0MzggMTEuMzEwNzIyNyw0My4zOTI5Mzk1IDguODQzNDA4Miw0Mi44OTk2MTkxIEM3LjE5OTEyNTk4LDQwLjk5MTU2NzQgOS4xMDcxNzc3MywtMzguMDE4MTAwNiAxNS4wMjc3MzQ0LDQyLjYzNjIwNjEgQzE1LjAyNzczNDQsNDIuNjM2MjA2MSAxMi45ODgxNTQzLDQzLjY1NTYzOTYgMTIuNjI2MzYyMyw0NS4zOTkzNzAxIEMxMi4yMzE0MjA5LDQ3LjEwOTk1MTIgMTIuNDk0NDc3NSw1MC43MjgyMjc1IDEyLjQ5NDQ3NzUsNTAuNzI4MjI3NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiNBNkEzODUiPgoNPC9wYXRoPg0KICAgICAgICAgICAgPHBhdGggZD0iTTEzLjIxODQxOCw0NC4wODM3MzA1IEMxMy4yMTg0MTgsNDQuMDgzNzMwNSAyNS4wMjc0NTEyLDM2LjMyMDcwOCAyMi4yNjM5MzA3LDIwLjE2OTgxNDUgQzE5LjU5OTg1ODQsOC40Mjc0MzY1MiAxMy4zMTcxNTMzLDQuNTc4ODk2NDggMTIuNjI2MzYyMywzLjA5ODU3OTEgQzExLjg2OTk4NTQsMi4wNDU5OTYwOSAxMS4xNDYwNDQ5LDAuMjA0MjQzMTY0IDExLjE0NjA0NDksMC4yMDQyNDMxNjQgTDExLjYzOTcyMTcsMzIuODY2NzUyOSBDMTEuNjM5NzIxNywzMi44OTk5MDIzIDEwLjYxOTkzMTYsNDIuODY2NDY5NyAxMy4yMTg3NzQ0LDQ0LjA4NDA4NjkiIGlkPSJTaGFwZSIgZmlsbD0iIzQ5OUQ0QSI+Cg08L3BhdGg+DQogICAgICAgICAgICA8cGF0aCBkPSJNMTAuNDU1NjEwNCw0NC41MTExMDg0IEMxMC40NTU2MTA0LDQ0LjUxMTEwODQgLTAuNjI5ODM4ODY3LDM2Ljk0NTU1NjYgMC4wMjgxNTkxNzk3LDIzLjYyNDEyNiBDMC42NTMwMDc4MTMsMTAuMzAyMzM4OSA4LjQ4MTYxNjIxLDMuNzU2NTc3MTUgOS45OTQ3MjY1NiwyLjU3MjQ2NTgyIEMxMC45ODE3MjM2LDEuNTE5ODgyODEgMTEuMDE0NTE2NiwxLjEyNDk0MTQxIDExLjA4MDQ1OSwwLjA3MjM1ODM5ODQgQzExLjc3MTI1LDEuNTUyNjc1NzggMTEuNjM5NzIxNywyMi4yMDk3NTEgMTEuNzM4MTAwNiwyNC42NDM1NTk2IEMxMi4wMzM5NTAyLDM0LjAxODA3MTMgMTEuMjExOTg3Myw0Mi43MzUyOTc5IDEwLjQ1NTYxMDQsNDQuNTExMTA4NCBaIiBpZD0iU2hhcGUiIGZpbGw9IiM1OEFBNTAiPgoNPC9wYXRoPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+";

type NodeDef = {
  id: string;
  label: string;
  layer: string;
  position: [number, number, number];
  color: string;
  svgSrc: string;
};

const NODES: NodeDef[] = [
  { id: "react",   label: "React.js",   layer: "Frontend",  position: [-2.1,  1.5,  0.6], color: "#61dafb", svgSrc: REACT_SVG   },
  { id: "express", label: "Express.js", layer: "API Layer", position: [ 0.3,  2.1, -0.4], color: "#8b9bff", svgSrc: EXPRESS_SVG },
  { id: "node",    label: "Node.js",    layer: "Server",    position: [ 2.2,  0.4,  0.2], color: "#7ee08a", svgSrc: NODE_SVG    },
  { id: "mongo",   label: "MongoDB",    layer: "Database",  position: [ 0.1, -1.9, -0.2], color: "#4ade80", svgSrc: MONGO_SVG   },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
];

function NodeMesh({ node }: { node: NodeDef }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += delta * (hovered ? 0.9 : 0.25);
    const targetZ = node.position[2] + (hovered ? 0.9 : 0);
    g.position.z += (targetZ - g.position.z) * 0.12;
    const s = hovered ? 1.18 : 1;
    g.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
  });

  return (
    <group
      ref={ref}
      position={node.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Glow ring — replaces the original solid mesh */}
      <mesh>
        <torusGeometry args={[0.58, 0.025, 8, 60]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={hovered ? 0.92 : 0.38}
        />
      </mesh>

      {/* Wireframe icosahedron — identical to original */}
      <mesh scale={1.35}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshBasicMaterial
          color={node.color}
          wireframe
          transparent
          opacity={hovered ? 0.35 : 0.12}
        />
      </mesh>

      {/* SVG logo — frosted-glass circle container */}
      <Html center distanceFactor={7} position={[0, 0, 0]}>
        <div
          style={{
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 14, 24, 0.68)",
            borderRadius: "50%",
            border: `1.5px solid ${node.color}44`,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: `0 0 ${hovered ? 24 : 10}px ${node.color}55, inset 0 0 8px ${node.color}22`,
            transition: "box-shadow 220ms ease",
          }}
        >
          <img
            src={node.svgSrc}
            draggable={false}
            alt={node.label}
            style={{
              width: 42,
              height: 42,
              objectFit: "contain",
              filter: `drop-shadow(0 0 ${hovered ? 10 : 5}px ${node.color})`,
              transition: "filter 220ms ease",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </div>
      </Html>

      {/* Label tooltip — unchanged from original */}
      <Html center distanceFactor={9} position={[0, 1.05, 0]}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            whiteSpace: "nowrap",
            padding: "6px 12px",
            borderRadius: 999,
            color: "white",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(10,14,24,0.72)",
            backdropFilter: "blur(8px)",
            opacity: hovered ? 1 : 0,
            transform: `translateY(${hovered ? 0 : 6}px)`,
            transition: "opacity 220ms ease, transform 220ms ease",
          }}
        >
          {node.label} · {node.layer}
        </div>
      </Html>
    </group>
  );
}

function Particles({ count = 160 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#7dd3fc" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function DataPacket({ from, to, offset }: { from: THREE.Vector3; to: THREE.Vector3; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = (state.clock.elapsedTime * 0.35 + offset) % 1;
    ref.current?.position.lerpVectors(from, to, t);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.075, 12, 12]} />
      <meshBasicMaterial color="#a5f3fc" />
    </mesh>
  );
}

/** Hero: the MERN ecosystem — Frontend → API → Server → Database. */
export function HeroMernScene() {
  const group = useRef<THREE.Group>(null);
  const scrollZ = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const scrolled = typeof window !== "undefined" ? Math.min(window.scrollY / 900, 1) : 0;
    scrollZ.current += (scrolled * -5 - scrollZ.current) * 0.08;
    g.position.z = scrollZ.current;
    g.rotation.y += ((state.pointer.x * 0.5 - g.rotation.y) * 0.05) + delta * 0.02;
    g.rotation.x += (-state.pointer.y * 0.25 - g.rotation.x) * 0.05;
  });

  const vectors = NODES.map((n) => new THREE.Vector3(...n.position));

  return (
    <group ref={group}>
      <Particles />
      {EDGES.map(([a, b], i) => (
        <group key={i}>
          <Line
            points={[vectors[a]!, vectors[b]!]}
            color="#38bdf8"
            lineWidth={1}
            transparent
            opacity={0.4}
          />
          <DataPacket from={vectors[a]!} to={vectors[b]!} offset={i * 0.25} />
        </group>
      ))}
      {NODES.map((node) => (
        <NodeMesh key={node.id} node={node} />
      ))}
      {[
        { text: "const app = express()", pos: [-3.4, -1.3, 1.4] },
        { text: "useEffect(() => {})", pos: [2.9, 2.1, 1.1] },
        { text: "db.users.find({})", pos: [-2.6, -2.6, -0.6] },
      ].map((snippet) => (
        <Float key={snippet.text} speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
          <Html center distanceFactor={11} position={snippet.pos as [number, number, number]}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "rgba(165,243,252,0.7)",
                whiteSpace: "nowrap",
              }}
            >
              {snippet.text}
            </span>
          </Html>
        </Float>
      ))}
    </group>
  );
}
