"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var path_1 = __importDefault(require("path"));
var semantic_ui_react_1 = require("semantic-ui-react");
var headers = ["Filename", "Percent", "Total", "Covered", "Uncovered"];
var SummaryPage = function (_a) {
    var fileCounts = _a.fileCounts, percentage = _a.percentage, total = _a.total, covered = _a.covered, uncovered = _a.uncovered, threshold = _a.threshold;
    var isSummaryValid = percentage >= threshold;
    return (react_1["default"].createElement(semantic_ui_react_1.Container, { style: { marginTop: "3em" } },
        react_1["default"].createElement(semantic_ui_react_1.Header, { as: "h1" }, "TypeScript coverage report"),
        react_1["default"].createElement(semantic_ui_react_1.Header, { as: "h2" }, "Summary"),
        react_1["default"].createElement(semantic_ui_react_1.Table, { celled: true },
            react_1["default"].createElement(semantic_ui_react_1.Table.Header, null,
                react_1["default"].createElement(semantic_ui_react_1.Table.Row, null, ["Percent", "Threshold", "Total", "Covered", "Uncovered"].map(function (header, index) { return (react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, { key: index }, header)); }))),
            react_1["default"].createElement(semantic_ui_react_1.Table.Body, null,
                react_1["default"].createElement(semantic_ui_react_1.Table.Row, { negative: !isSummaryValid, positive: isSummaryValid },
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, percentage.toFixed(2) + "%"),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null,
                        threshold,
                        "%"),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, total),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, covered),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, uncovered)))),
        react_1["default"].createElement(semantic_ui_react_1.Header, { as: "h2" }, "Files"),
        react_1["default"].createElement(semantic_ui_react_1.Table, { celled: true, style: { marginTop: "2em" }, className: "sortable" },
            react_1["default"].createElement(semantic_ui_react_1.Table.Header, null,
                react_1["default"].createElement(semantic_ui_react_1.Table.Row, null, headers.map(function (header, index) { return (react_1["default"].createElement(semantic_ui_react_1.Table.HeaderCell, { key: index }, header)); }))),
            react_1["default"].createElement(semantic_ui_react_1.Table.Body, null, Array.from(fileCounts).map(function (_a, index) {
                var filename = _a[0], _b = _a[1], correctCount = _b.correctCount, totalCount = _b.totalCount;
                var percentage = totalCount === 0 ? 100 : (correctCount * 100) / totalCount;
                var percentageCoverage = percentage.toFixed(2) + "%";
                var isValid = percentage >= threshold;
                return (react_1["default"].createElement(semantic_ui_react_1.Table.Row, { key: index, negative: !isValid, positive: isValid },
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, { selectable: true },
                        react_1["default"].createElement("a", { style: { color: "inherit" }, href: path_1["default"].join("files", "".concat(filename, ".html")) }, filename)),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, percentageCoverage),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, totalCount),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, correctCount),
                    react_1["default"].createElement(semantic_ui_react_1.Table.Cell, null, totalCount - correctCount)));
            })))));
};
exports["default"] = SummaryPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VtbWFyeVBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TdW1tYXJ5UGFnZS9TdW1tYXJ5UGFnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBMEI7QUFDMUIsOENBQXdCO0FBQ3hCLHVEQUE2RDtBQUc3RCxJQUFNLE9BQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQU16RSxJQUFNLFdBQVcsR0FBRyxVQUFDLEVBT2I7UUFOTixVQUFVLGdCQUFBLEVBQ1YsVUFBVSxnQkFBQSxFQUNWLEtBQUssV0FBQSxFQUNMLE9BQU8sYUFBQSxFQUNQLFNBQVMsZUFBQSxFQUNULFNBQVMsZUFBQTtJQUVULElBQU0sY0FBYyxHQUFHLFVBQVUsSUFBSSxTQUFTLENBQUM7SUFFL0MsT0FBTyxDQUNMLGlDQUFDLDZCQUFTLElBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtRQUNwQyxpQ0FBQywwQkFBTSxJQUFDLEVBQUUsRUFBQyxJQUFJLGlDQUFvQztRQUNuRCxpQ0FBQywwQkFBTSxJQUFDLEVBQUUsRUFBQyxJQUFJLGNBQWlCO1FBQ2hDLGlDQUFDLHlCQUFLLElBQUMsTUFBTTtZQUNYLGlDQUFDLHlCQUFLLENBQUMsTUFBTTtnQkFDWCxpQ0FBQyx5QkFBSyxDQUFDLEdBQUcsUUFDUCxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQzVELFVBQUMsTUFBTSxFQUFFLEtBQUssSUFBSyxPQUFBLENBQ2pCLGlDQUFDLHlCQUFLLENBQUMsVUFBVSxJQUFDLEdBQUcsRUFBRSxLQUFLLElBQUcsTUFBTSxDQUFvQixDQUMxRCxFQUZrQixDQUVsQixDQUNGLENBQ1MsQ0FDQztZQUNmLGlDQUFDLHlCQUFLLENBQUMsSUFBSTtn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