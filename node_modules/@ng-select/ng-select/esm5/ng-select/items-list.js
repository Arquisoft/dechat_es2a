/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as searchHelper from './search-helper';
import { isDefined, isFunction, isObject } from './value-utils';
import { newId } from './id';
/** @typedef {?} */
var OptionGroups;
var ItemsList = /** @class */ (function () {
    function ItemsList(_ngSelect, _selectionModel) {
        this._ngSelect = _ngSelect;
        this._selectionModel = _selectionModel;
        this._items = [];
        this._filteredItems = [];
        this._markedIndex = -1;
    }
    Object.defineProperty(ItemsList.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "filteredItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filteredItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "markedIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._markedIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "selectedItems", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectionModel.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "markedItem", {
        get: /**
         * @return {?}
         */
        function () {
            return this._filteredItems[this._markedIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "noItemsToSelect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ngSelect.hideSelected && this._items.length === this.selectedItems.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "maxItemsSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ngSelect.multiple && this._ngSelect.maxSelectedItems <= this.selectedItems.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "lastSelectedItem", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var i = this.selectedItems.length - 1;
            for (; i >= 0; i--) {
                /** @type {?} */
                var item = this.selectedItems[i];
                if (!item.disabled) {
                    return item;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} items
     * @return {?}
     */
    ItemsList.prototype.setItems = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        this._items = items.map(function (item, index) { return _this.mapItem(item, index); });
        if (this._ngSelect.groupBy) {
            this._groups = this._groupBy(this._items, this._ngSelect.groupBy);
            this._items = this._flatten(this._groups);
        }
        else {
            this._groups = new Map();
            this._groups.set(undefined, this._items);
        }
        this._filteredItems = tslib_1.__spread(this._items);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.select = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.selected || this.maxItemsSelected) {
            return;
        }
        /** @type {?} */
        var multiple = this._ngSelect.multiple;
        if (!multiple) {
            this.clearSelected();
        }
        this._selectionModel.select(item, multiple, this._ngSelect.selectableGroupAsModel);
        if (this._ngSelect.hideSelected) {
            this._hideSelected(item);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.unselect = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item.selected) {
            return;
        }
        this._selectionModel.unselect(item, this._ngSelect.multiple);
        if (this._ngSelect.hideSelected && isDefined(item.index) && this._ngSelect.multiple) {
            this._showSelected(item);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ItemsList.prototype.findItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var findBy;
        if (this._ngSelect.compareWith) {
            findBy = function (item) { return _this._ngSelect.compareWith(item.value, value); };
        }
        else if (this._ngSelect.bindValue) {
            findBy = function (item) { return !item.children && _this.resolveNested(item.value, _this._ngSelect.bindValue) === value; };
        }
        else {
            findBy = function (item) { return item.value === value ||
                !item.children && item.label && item.label === _this.resolveNested(value, _this._ngSelect.bindLabel); };
        }
        return this._items.find(function (item) { return findBy(item); });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.addItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var option = this.mapItem(item, this._items.length);
        this._items.push(option);
        this._filteredItems.push(option);
        return option;
    };
    /**
     * @param {?=} keepDisabled
     * @return {?}
     */
    ItemsList.prototype.clearSelected = /**
     * @param {?=} keepDisabled
     * @return {?}
     */
    function (keepDisabled) {
        if (keepDisabled === void 0) { keepDisabled = false; }
        this._selectionModel.clear(keepDisabled);
        this._items.forEach(function (item) {
            item.selected = keepDisabled && item.selected && item.disabled;
            item.marked = false;
        });
        if (this._ngSelect.hideSelected) {
            this.resetFilteredItems();
        }
    };
    /**
     * @param {?} term
     * @return {?}
     */
    ItemsList.prototype.findByLabel = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        term = searchHelper.stripSpecialChars(term).toLocaleLowerCase();
        return this.filteredItems.find(function (item) {
            /** @type {?} */
            var label = searchHelper.stripSpecialChars(item.label).toLocaleLowerCase();
            return label.substr(0, term.length) === term;
        });
    };
    /**
     * @param {?} term
     * @return {?}
     */
    ItemsList.prototype.filter = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var e_1, _a;
        if (!term) {
            this.resetFilteredItems();
            return;
        }
        this._filteredItems = [];
        term = this._ngSelect.searchFn ? term : searchHelper.stripSpecialChars(term).toLocaleLowerCase();
        /** @type {?} */
        var match = this._ngSelect.searchFn || this._defaultSearchFn;
        /** @type {?} */
        var hideSelected = this._ngSelect.hideSelected;
        var _loop_1 = function (key) {
            var e_2, _a, _b;
            /** @type {?} */
            var matchedItems = [];
            try {
                for (var _c = tslib_1.__values(this_1._groups.get(key)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    if (hideSelected && (item.parent && item.parent.selected || item.selected)) {
                        continue;
                    }
                    /** @type {?} */
                    var searchItem = this_1._ngSelect.searchFn ? item.value : item;
                    if (match(term, searchItem)) {
                        matchedItems.push(item);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (matchedItems.length > 0) {
                var _e = tslib_1.__read(matchedItems.slice(-1), 1), last_1 = _e[0];
                if (last_1.parent) {
                    /** @type {?} */
                    var head = this_1._items.find(function (x) { return x === last_1.parent; });
                    this_1._filteredItems.push(head);
                }
                (_b = this_1._filteredItems).push.apply(_b, tslib_1.__spread(matchedItems));
            }
        };
        var this_1 = this;
        try {
            for (var _b = tslib_1.__values(Array.from(this._groups.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                _loop_1(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.resetFilteredItems = /**
     * @return {?}
     */
    function () {
        if (this._filteredItems.length === this._items.length) {
            return;
        }
        if (this._ngSelect.hideSelected && this.selectedItems.length > 0) {
            this._filteredItems = this._items.filter(function (x) { return !x.selected; });
        }
        else {
            this._filteredItems = this._items;
        }
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.unmarkItem = /**
     * @return {?}
     */
    function () {
        this._markedIndex = -1;
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.markNextItem = /**
     * @return {?}
     */
    function () {
        this._stepToItem(+1);
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.markPreviousItem = /**
     * @return {?}
     */
    function () {
        this._stepToItem(-1);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.markItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._markedIndex = this._filteredItems.indexOf(item);
    };
    /**
     * @param {?=} markDefault
     * @return {?}
     */
    ItemsList.prototype.markSelectedOrDefault = /**
     * @param {?=} markDefault
     * @return {?}
     */
    function (markDefault) {
        if (this._filteredItems.length === 0) {
            return;
        }
        /** @type {?} */
        var indexOfLastSelected = this._ngSelect.hideSelected ? -1 : this._filteredItems.indexOf(this.lastSelectedItem);
        if (this.lastSelectedItem && indexOfLastSelected > -1) {
            this._markedIndex = indexOfLastSelected;
        }
        else {
            if (this._ngSelect.excludeGroupsFromDefaultSelection) {
                this._markedIndex = markDefault ? this.filteredItems.findIndex(function (x) { return !x.disabled && !x.children; }) : -1;
            }
            else {
                this._markedIndex = markDefault ? this.filteredItems.findIndex(function (x) { return !x.disabled; }) : -1;
            }
        }
    };
    /**
     * @param {?} option
     * @param {?} key
     * @return {?}
     */
    ItemsList.prototype.resolveNested = /**
     * @param {?} option
     * @param {?} key
     * @return {?}
     */
    function (option, key) {
        if (!isObject(option)) {
            return option;
        }
        if (key.indexOf('.') === -1) {
            return option[key];
        }
        else {
            /** @type {?} */
            var keys = key.split('.');
            /** @type {?} */
            var value = option;
            for (var i = 0, len = keys.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[keys[i]];
            }
            return value;
        }
    };
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    ItemsList.prototype.mapItem = /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    function (item, index) {
        /** @type {?} */
        var label = isDefined(item.$ngOptionLabel) ? item.$ngOptionLabel : this.resolveNested(item, this._ngSelect.bindLabel);
        /** @type {?} */
        var value = isDefined(item.$ngOptionValue) ? item.$ngOptionValue : item;
        return {
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: newId(),
        };
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.mapSelectedItems = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var e_3, _a;
        /** @type {?} */
        var multiple = this._ngSelect.multiple;
        try {
            for (var _b = tslib_1.__values(this.selectedItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var selected = _c.value;
                /** @type {?} */
                var value = this._ngSelect.bindValue ? this.resolveNested(selected.value, this._ngSelect.bindValue) : selected.value;
                /** @type {?} */
                var item = isDefined(value) ? this.findItem(value) : null;
                this._selectionModel.unselect(selected, multiple);
                this._selectionModel.select(item || selected, multiple, this._ngSelect.selectableGroupAsModel);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (this._ngSelect.hideSelected) {
            this._filteredItems = this.filteredItems.filter(function (x) { return _this.selectedItems.indexOf(x) === -1; });
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype._showSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var e_4, _a;
        this._filteredItems.push(item);
        if (item.parent) {
            /** @type {?} */
            var parent_1 = item.parent;
            /** @type {?} */
            var parentExists = this._filteredItems.find(function (x) { return x === parent_1; });
            if (!parentExists) {
                this._filteredItems.push(parent_1);
            }
        }
        else if (item.children) {
            try {
                for (var _b = tslib_1.__values(item.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    child.selected = false;
                    this._filteredItems.push(child);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        this._filteredItems = tslib_1.__spread(this._filteredItems.sort(function (a, b) { return (a.index - b.index); }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype._hideSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this._filteredItems = this._filteredItems.filter(function (x) { return x !== item; });
        if (item.parent) {
            /** @type {?} */
            var children = item.parent.children;
            if (children.every(function (x) { return x.selected; })) {
                this._filteredItems = this._filteredItems.filter(function (x) { return x !== item.parent; });
            }
        }
        else if (item.children) {
            this._filteredItems = this.filteredItems.filter(function (x) { return x.parent !== item; });
        }
    };
    /**
     * @param {?} search
     * @param {?} opt
     * @return {?}
     */
    ItemsList.prototype._defaultSearchFn = /**
     * @param {?} search
     * @param {?} opt
     * @return {?}
     */
    function (search, opt) {
        /** @type {?} */
        var label = searchHelper.stripSpecialChars(opt.label).toLocaleLowerCase();
        return label.indexOf(search) > -1;
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    ItemsList.prototype._getNextItemIndex = /**
     * @param {?} steps
     * @return {?}
     */
    function (steps) {
        if (steps > 0) {
            return (this._markedIndex === this._filteredItems.length - 1) ? 0 : (this._markedIndex + 1);
        }
        return (this._markedIndex <= 0) ? (this._filteredItems.length - 1) : (this._markedIndex - 1);
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    ItemsList.prototype._stepToItem = /**
     * @param {?} steps
     * @return {?}
     */
    function (steps) {
        if (this._filteredItems.length === 0 || this._filteredItems.every(function (x) { return x.disabled; })) {
            return;
        }
        this._markedIndex = this._getNextItemIndex(steps);
        if (this.markedItem.disabled) {
            this._stepToItem(steps);
        }
    };
    /**
     * @param {?} items
     * @param {?} prop
     * @return {?}
     */
    ItemsList.prototype._groupBy = /**
     * @param {?} items
     * @param {?} prop
     * @return {?}
     */
    function (items, prop) {
        var _this = this;
        var e_5, _a, e_6, _b;
        /** @type {?} */
        var groups = new Map();
        if (items.length === 0) {
            return groups;
        }
        // Check if items are already grouped by given key.
        if (Array.isArray(items[0].value[/** @type {?} */ (prop)])) {
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    /** @type {?} */
                    var children = (item.value[/** @type {?} */ (prop)] || []).map(function (x, index) { return _this.mapItem(x, index); });
                    groups.set(item, children);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return groups;
        }
        /** @type {?} */
        var isFnKey = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        var keyFn = function (item) {
            /** @type {?} */
            var key = isFnKey ? (/** @type {?} */ (prop))(item.value) : item.value[/** @type {?} */ (prop)];
            return isDefined(key) ? key : undefined;
        };
        try {
            // Group items by key.
            for (var items_2 = tslib_1.__values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                var item = items_2_1.value;
                /** @type {?} */
                var key = keyFn(item);
                /** @type {?} */
                var group = groups.get(key);
                if (group) {
                    group.push(item);
                }
                else {
                    groups.set(key, [item]);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (items_2_1 && !items_2_1.done && (_b = items_2.return)) _b.call(items_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return groups;
    };
    /**
     * @param {?} groups
     * @return {?}
     */
    ItemsList.prototype._flatten = /**
     * @param {?} groups
     * @return {?}
     */
    function (groups) {
        var e_7, _a;
        /** @type {?} */
        var isGroupByFn = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        var items = [];
        /** @type {?} */
        var withoutGroup = groups.get(undefined) || [];
        items.push.apply(items, tslib_1.__spread(withoutGroup));
        /** @type {?} */
        var i = withoutGroup.length;
        var _loop_2 = function (key) {
            if (!isDefined(key)) {
                return "continue";
            }
            /** @type {?} */
            var isObjectKey = isObject(key);
            /** @type {?} */
            var parent_2 = {
                label: isObjectKey ? '' : /** @type {?} */ (key),
                children: undefined,
                parent: null,
                index: i++,
                disabled: !this_2._ngSelect.selectableGroup,
                htmlId: newId(),
            };
            /** @type {?} */
            var groupKey = isGroupByFn ? this_2._ngSelect.bindLabel : /** @type {?} */ (this_2._ngSelect.groupBy);
            /** @type {?} */
            var groupValue = this_2._ngSelect.groupValue || (function () {
                var _a;
                if (isObjectKey) {
                    return (/** @type {?} */ (key)).value;
                }
                return _a = {}, _a[groupKey] = key, _a;
            });
            /** @type {?} */
            var children = groups.get(key).map(function (x) {
                x.parent = parent_2;
                x.children = undefined;
                x.index = i++;
                return x;
            });
            parent_2.children = children;
            parent_2.value = groupValue(key, children.map(function (x) { return x.value; }));
            items.push(parent_2);
            items.push.apply(items, tslib_1.__spread(children));
        };
        var this_2 = this;
        try {
            for (var _b = tslib_1.__values(Array.from(groups.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                _loop_2(key);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return items;
    };
    return ItemsList;
}());
export { ItemsList };
if (false) {
    /** @type {?} */
    ItemsList.prototype._groups;
    /** @type {?} */
    ItemsList.prototype._items;
    /** @type {?} */
    ItemsList.prototype._filteredItems;
    /** @type {?} */
    ItemsList.prototype._markedIndex;
    /** @type {?} */
    ItemsList.prototype._ngSelect;
    /** @type {?} */
    ItemsList.prototype._selectionModel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zZWxlY3Qvbmctc2VsZWN0LyIsInNvdXJjZXMiOlsibmctc2VsZWN0L2l0ZW1zLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEtBQUssWUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFLN0IsSUFBQTtJQUdJLG1CQUNZLFdBQ0E7UUFEQSxjQUFTLEdBQVQsU0FBUztRQUNULG9CQUFlLEdBQWYsZUFBZTtzQkFHRSxFQUFFOzhCQU1NLEVBQUU7NEJBTWhCLENBQUMsQ0FBQztLQWR4QjtJQUlELHNCQUFJLDRCQUFLOzs7O1FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7OztPQUFBO0lBSUQsc0JBQUksb0NBQWE7Ozs7UUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDOUI7OztPQUFBO0lBSUQsc0JBQUksa0NBQVc7Ozs7UUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1Qjs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBYTs7OztRQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7U0FDckM7OztPQUFBO0lBRUQsc0JBQUksaUNBQVU7Ozs7UUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDakQ7OztPQUFBO0lBRUQsc0JBQUksc0NBQWU7Ozs7UUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFD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SUFBRyxHQUFHLEtBQUc7YUFDOUIsQ0FBQyxDQUFDOztZQUNILElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFNLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxDQUFDO2FBQ1osQ0FBQyxDQUFDO1lBQ0gsUUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDM0IsUUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFNLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsSUFBSSxPQUFWLEtBQUssbUJBQVMsUUFBUSxHQUFFOzs7O1lBN0I1QixLQUFrQixJQUFBLEtBQUEsaUJBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQSxnQkFBQTtnQkFBdEMsSUFBTSxHQUFHLFdBQUE7d0JBQUgsR0FBRzthQThCYjs7Ozs7Ozs7O1FBQ0QsT0FBTyxLQUFLLENBQUM7O29CQS9YckI7SUFpWUMsQ0FBQTtBQXhYRCxxQkF3WEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ09wdGlvbiB9IGZyb20gJy4vbmctc2VsZWN0LnR5cGVzJztcbmltcG9ydCAqIGFzIHNlYXJjaEhlbHBlciBmcm9tICcuL3NlYXJjaC1oZWxwZXInO1xuaW1wb3J0IHsgTmdTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuL25nLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgaXNEZWZpbmVkLCBpc0Z1bmN0aW9uLCBpc09iamVjdCB9IGZyb20gJy4vdmFsdWUtdXRpbHMnO1xuaW1wb3J0IHsgbmV3SWQgfSBmcm9tICcuL2lkJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnLi9zZWxlY3Rpb24tbW9kZWwnO1xuXG50eXBlIE9wdGlvbkdyb3VwcyA9IE1hcDxzdHJpbmcgfCBOZ09wdGlvbiwgTmdPcHRpb25bXT47XG5cbmV4cG9ydCBjbGFzcyBJdGVtc0xpc3Qge1xuICAgIHByaXZhdGUgX2dyb3VwczogT3B0aW9uR3JvdXBzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX25nU2VsZWN0OiBOZ1NlbGVjdENvbXBvbmVudCxcbiAgICAgICAgcHJpdmF0ZSBfc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IE5nT3B0aW9uW10gPSBbXTtcblxuICAgIGdldCBpdGVtcygpOiBOZ09wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbHRlcmVkSXRlbXM6IE5nT3B0aW9uW10gPSBbXTtcblxuICAgIGdldCBmaWx0ZXJlZEl0ZW1zKCk6IE5nT3B0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyZWRJdGVtcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXJrZWRJbmRleCA9IC0xO1xuXG4gICAgZ2V0IG1hcmtlZEluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZWRJbmRleDtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtYXJrZWRJdGVtKCk6IE5nT3B0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcmVkSXRlbXNbdGhpcy5fbWFya2VkSW5kZXhdO1xuICAgIH1cblxuICAgIGdldCBub0l0ZW1zVG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQgJiYgdGhpcy5faXRlbXMubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBtYXhJdGVtc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdTZWxlY3QubXVsdGlwbGUgJiYgdGhpcy5fbmdTZWxlY3QubWF4U2VsZWN0ZWRJdGVtcyA8PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBsYXN0U2VsZWN0ZWRJdGVtKCkge1xuICAgICAgICBsZXQgaSA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgaWYgKCFpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0SXRlbXMoaXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5tYXBJdGVtKGl0ZW0sIGluZGV4KSk7XG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5ncm91cEJ5KSB7XG4gICAgICAgICAgICB0aGlzLl9ncm91cHMgPSB0aGlzLl9ncm91cEJ5KHRoaXMuX2l0ZW1zLCB0aGlzLl9uZ1NlbGVjdC5ncm91cEJ5KTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gdGhpcy5fZmxhdHRlbih0aGlzLl9ncm91cHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ3JvdXBzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fZ3JvdXBzLnNldCh1bmRlZmluZWQsIHRoaXMuX2l0ZW1zKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSBbLi4udGhpcy5faXRlbXNdO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBOZ09wdGlvbikge1xuICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZCB8fCB0aGlzLm1heEl0ZW1zU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtdWx0aXBsZSA9IHRoaXMuX25nU2VsZWN0Lm11bHRpcGxlO1xuICAgICAgICBpZiAoIW11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChpdGVtLCBtdWx0aXBsZSwgdGhpcy5fbmdTZWxlY3Quc2VsZWN0YWJsZUdyb3VwQXNNb2RlbCk7XG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGVTZWxlY3RlZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuc2VsZWN0KGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIGlmICghaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnVuc2VsZWN0KGl0ZW0sIHRoaXMuX25nU2VsZWN0Lm11bHRpcGxlKTtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCAmJiBpc0RlZmluZWQoaXRlbS5pbmRleCkgJiYgdGhpcy5fbmdTZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3RlZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRJdGVtKHZhbHVlOiBhbnkpOiBOZ09wdGlvbiB7XG4gICAgICAgIGxldCBmaW5kQnk6IChpdGVtOiBOZ09wdGlvbikgPT4gYm9vbGVhbjtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmNvbXBhcmVXaXRoKSB7XG4gICAgICAgICAgICBmaW5kQnkgPSBpdGVtID0+IHRoaXMuX25nU2VsZWN0LmNvbXBhcmVXaXRoKGl0ZW0udmFsdWUsIHZhbHVlKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25nU2VsZWN0LmJpbmRWYWx1ZSkge1xuICAgICAgICAgICAgZmluZEJ5ID0gaXRlbSA9PiAhaXRlbS5jaGlsZHJlbiAmJiB0aGlzLnJlc29sdmVOZXN0ZWQoaXRlbS52YWx1ZSwgdGhpcy5fbmdTZWxlY3QuYmluZFZhbHVlKSA9PT0gdmFsdWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbmRCeSA9IGl0ZW0gPT4gaXRlbS52YWx1ZSA9PT0gdmFsdWUgfHxcbiAgICAgICAgICAgICAgICAhaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxhYmVsICYmIGl0ZW0ubGFiZWwgPT09IHRoaXMucmVzb2x2ZU5lc3RlZCh2YWx1ZSwgdGhpcy5fbmdTZWxlY3QuYmluZExhYmVsKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gZmluZEJ5KGl0ZW0pKTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGl0ZW06IGFueSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLm1hcEl0ZW0oaXRlbSwgdGhpcy5faXRlbXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5faXRlbXMucHVzaChvcHRpb24pO1xuICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkKGtlZXBEaXNhYmxlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKGtlZXBEaXNhYmxlZCk7XG4gICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0ga2VlcERpc2FibGVkICYmIGl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5kaXNhYmxlZDtcbiAgICAgICAgICAgIGl0ZW0ubWFya2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuaGlkZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0RmlsdGVyZWRJdGVtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZEJ5TGFiZWwodGVybTogc3RyaW5nKSB7XG4gICAgICAgIHRlcm0gPSBzZWFyY2hIZWxwZXIuc3RyaXBTcGVjaWFsQ2hhcnModGVybSkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRJdGVtcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBzZWFyY2hIZWxwZXIuc3RyaXBTcGVjaWFsQ2hhcnMoaXRlbS5sYWJlbCkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBsYWJlbC5zdWJzdHIoMCwgdGVybS5sZW5ndGgpID09PSB0ZXJtO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaWx0ZXIodGVybTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghdGVybSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlcmVkSXRlbXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSBbXTtcbiAgICAgICAgdGVybSA9IHRoaXMuX25nU2VsZWN0LnNlYXJjaEZuID8gdGVybSA6IHNlYXJjaEhlbHBlci5zdHJpcFNwZWNpYWxDaGFycyh0ZXJtKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBtYXRjaCA9IHRoaXMuX25nU2VsZWN0LnNlYXJjaEZuIHx8IHRoaXMuX2RlZmF1bHRTZWFyY2hGbjtcbiAgICAgICAgY29uc3QgaGlkZVNlbGVjdGVkID0gdGhpcy5fbmdTZWxlY3QuaGlkZVNlbGVjdGVkO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20odGhpcy5fZ3JvdXBzLmtleXMoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2dyb3Vwcy5nZXQoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChoaWRlU2VsZWN0ZWQgJiYgKGl0ZW0ucGFyZW50ICYmIGl0ZW0ucGFyZW50LnNlbGVjdGVkIHx8IGl0ZW0uc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hJdGVtID0gdGhpcy5fbmdTZWxlY3Quc2VhcmNoRm4gPyBpdGVtLnZhbHVlIDogaXRlbTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2godGVybSwgc2VhcmNoSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgW2xhc3RdID0gbWF0Y2hlZEl0ZW1zLnNsaWNlKC0xKTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMuX2l0ZW1zLmZpbmQoeCA9PiB4ID09PSBsYXN0LnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMucHVzaChoZWFkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcy5wdXNoKC4uLm1hdGNoZWRJdGVtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldEZpbHRlcmVkSXRlbXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWx0ZXJlZEl0ZW1zLmxlbmd0aCA9PT0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuaGlkZVNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gdGhpcy5faXRlbXMuZmlsdGVyKHggPT4gIXguc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IHRoaXMuX2l0ZW1zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5tYXJrSXRlbSgpIHtcbiAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSAtMTtcbiAgICB9XG5cbiAgICBtYXJrTmV4dEl0ZW0oKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBUb0l0ZW0oKzEpO1xuICAgIH1cblxuICAgIG1hcmtQcmV2aW91c0l0ZW0oKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBUb0l0ZW0oLTEpO1xuICAgIH1cblxuICAgIG1hcmtJdGVtKGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX21hcmtlZEluZGV4ID0gdGhpcy5fZmlsdGVyZWRJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgIH1cblxuICAgIG1hcmtTZWxlY3RlZE9yRGVmYXVsdChtYXJrRGVmYXVsdD86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbHRlcmVkSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5kZXhPZkxhc3RTZWxlY3RlZCA9IHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCA/IC0xIDogdGhpcy5fZmlsdGVyZWRJdGVtcy5pbmRleE9mKHRoaXMubGFzdFNlbGVjdGVkSXRlbSk7XG4gICAgICAgIGlmICh0aGlzLmxhc3RTZWxlY3RlZEl0ZW0gJiYgaW5kZXhPZkxhc3RTZWxlY3RlZCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZWRJbmRleCA9IGluZGV4T2ZMYXN0U2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuZXhjbHVkZUdyb3Vwc0Zyb21EZWZhdWx0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSBtYXJrRGVmYXVsdCA/IHRoaXMuZmlsdGVyZWRJdGVtcy5maW5kSW5kZXgoeCA9PiAheC5kaXNhYmxlZCAmJiAheC5jaGlsZHJlbikgOiAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSBtYXJrRGVmYXVsdCA/IHRoaXMuZmlsdGVyZWRJdGVtcy5maW5kSW5kZXgoeCA9PiAheC5kaXNhYmxlZCkgOiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc29sdmVOZXN0ZWQob3B0aW9uOiBhbnksIGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKCFpc09iamVjdChvcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbltrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGtleXM6IHN0cmluZ1tdID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb247XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2tleXNbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFwSXRlbShpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpOiBOZ09wdGlvbiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gaXNEZWZpbmVkKGl0ZW0uJG5nT3B0aW9uTGFiZWwpID8gaXRlbS4kbmdPcHRpb25MYWJlbCA6IHRoaXMucmVzb2x2ZU5lc3RlZChpdGVtLCB0aGlzLl9uZ1NlbGVjdC5iaW5kTGFiZWwpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRGVmaW5lZChpdGVtLiRuZ09wdGlvblZhbHVlKSA/IGl0ZW0uJG5nT3B0aW9uVmFsdWUgOiBpdGVtO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgbGFiZWw6IGlzRGVmaW5lZChsYWJlbCkgPyBsYWJlbC50b1N0cmluZygpIDogJycsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkaXNhYmxlZDogaXRlbS5kaXNhYmxlZCxcbiAgICAgICAgICAgIGh0bWxJZDogbmV3SWQoKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBtYXBTZWxlY3RlZEl0ZW1zKCkge1xuICAgICAgICBjb25zdCBtdWx0aXBsZSA9IHRoaXMuX25nU2VsZWN0Lm11bHRpcGxlO1xuICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdGVkIG9mIHRoaXMuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9uZ1NlbGVjdC5iaW5kVmFsdWUgPyB0aGlzLnJlc29sdmVOZXN0ZWQoc2VsZWN0ZWQudmFsdWUsIHRoaXMuX25nU2VsZWN0LmJpbmRWYWx1ZSkgOiBzZWxlY3RlZC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpc0RlZmluZWQodmFsdWUpID8gdGhpcy5maW5kSXRlbSh2YWx1ZSkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwudW5zZWxlY3Qoc2VsZWN0ZWQsIG11bHRpcGxlKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChpdGVtIHx8IHNlbGVjdGVkLCBtdWx0aXBsZSwgdGhpcy5fbmdTZWxlY3Quc2VsZWN0YWJsZUdyb3VwQXNNb2RlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuaGlkZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gdGhpcy5maWx0ZXJlZEl0ZW1zLmZpbHRlcih4ID0+IHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHgpID09PSAtMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93U2VsZWN0ZWQoaXRlbTogTmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICBpZiAoaXRlbS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGl0ZW0ucGFyZW50O1xuICAgICAgICAgICAgY29uc3QgcGFyZW50RXhpc3RzID0gdGhpcy5fZmlsdGVyZWRJdGVtcy5maW5kKHggPT4geCA9PT0gcGFyZW50KTtcbiAgICAgICAgICAgIGlmICghcGFyZW50RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSBbLi4udGhpcy5fZmlsdGVyZWRJdGVtcy5zb3J0KChhLCBiKSA9PiAoYS5pbmRleCAtIGIuaW5kZXgpKV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlkZVNlbGVjdGVkKGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSB0aGlzLl9maWx0ZXJlZEl0ZW1zLmZpbHRlcih4ID0+IHggIT09IGl0ZW0pO1xuICAgICAgICBpZiAoaXRlbS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbS5wYXJlbnQuY2hpbGRyZW47XG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoeCA9PiB4LnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSB0aGlzLl9maWx0ZXJlZEl0ZW1zLmZpbHRlcih4ID0+IHggIT09IGl0ZW0ucGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gdGhpcy5maWx0ZXJlZEl0ZW1zLmZpbHRlcih4ID0+IHgucGFyZW50ICE9PSBpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2RlZmF1bHRTZWFyY2hGbihzZWFyY2g6IHN0cmluZywgb3B0OiBOZ09wdGlvbikge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHNlYXJjaEhlbHBlci5zdHJpcFNwZWNpYWxDaGFycyhvcHQubGFiZWwpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsYWJlbC5pbmRleE9mKHNlYXJjaCkgPiAtMVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE5leHRJdGVtSW5kZXgoc3RlcHM6IG51bWJlcikge1xuICAgICAgICBpZiAoc3RlcHMgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX21hcmtlZEluZGV4ID09PSB0aGlzLl9maWx0ZXJlZEl0ZW1zLmxlbmd0aCAtIDEpID8gMCA6ICh0aGlzLl9tYXJrZWRJbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFya2VkSW5kZXggPD0gMCkgPyAodGhpcy5fZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxKSA6ICh0aGlzLl9tYXJrZWRJbmRleCAtIDEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N0ZXBUb0l0ZW0oc3RlcHM6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDAgfHwgdGhpcy5fZmlsdGVyZWRJdGVtcy5ldmVyeSh4ID0+IHguZGlzYWJsZWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYXJrZWRJbmRleCA9IHRoaXMuX2dldE5leHRJdGVtSW5kZXgoc3RlcHMpO1xuICAgICAgICBpZiAodGhpcy5tYXJrZWRJdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGVwVG9JdGVtKHN0ZXBzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dyb3VwQnkoaXRlbXM6IE5nT3B0aW9uW10sIHByb3A6IHN0cmluZyB8IEZ1bmN0aW9uKTogT3B0aW9uR3JvdXBzIHtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gbmV3IE1hcDxzdHJpbmcgfCBOZ09wdGlvbiwgTmdPcHRpb25bXT4oKTtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0ZW1zIGFyZSBhbHJlYWR5IGdyb3VwZWQgYnkgZ2l2ZW4ga2V5LlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtc1swXS52YWx1ZVs8c3RyaW5nPnByb3BdKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSAoaXRlbS52YWx1ZVs8c3RyaW5nPnByb3BdIHx8IFtdKS5tYXAoKHgsIGluZGV4KSA9PiB0aGlzLm1hcEl0ZW0oeCwgaW5kZXgpKTtcbiAgICAgICAgICAgICAgICBncm91cHMuc2V0KGl0ZW0sIGNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBncm91cHM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc0ZuS2V5ID0gaXNGdW5jdGlvbih0aGlzLl9uZ1NlbGVjdC5ncm91cEJ5KTtcbiAgICAgICAgY29uc3Qga2V5Rm4gPSAoaXRlbTogTmdPcHRpb24pID0+IHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBpc0ZuS2V5ID8gKDxGdW5jdGlvbj5wcm9wKShpdGVtLnZhbHVlKSA6IGl0ZW0udmFsdWVbPHN0cmluZz5wcm9wXTtcbiAgICAgICAgICAgIHJldHVybiBpc0RlZmluZWQoa2V5KSA/IGtleSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBHcm91cCBpdGVtcyBieSBrZXkuXG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgbGV0IGtleSA9IGtleUZuKGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBncm91cHMuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBncm91cC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBncm91cHMuc2V0KGtleSwgW2l0ZW1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZsYXR0ZW4oZ3JvdXBzOiBPcHRpb25Hcm91cHMpIHtcbiAgICAgICAgY29uc3QgaXNHcm91cEJ5Rm4gPSBpc0Z1bmN0aW9uKHRoaXMuX25nU2VsZWN0Lmdyb3VwQnkpO1xuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCB3aXRob3V0R3JvdXAgPSBncm91cHMuZ2V0KHVuZGVmaW5lZCkgfHwgW107XG4gICAgICAgIGl0ZW1zLnB1c2goLi4ud2l0aG91dEdyb3VwKTtcbiAgICAgICAgbGV0IGkgPSB3aXRob3V0R3JvdXAubGVuZ3RoO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKGdyb3Vwcy5rZXlzKCkpKSB7XG4gICAgICAgICAgICBpZiAoIWlzRGVmaW5lZChrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpc09iamVjdEtleSA9IGlzT2JqZWN0KGtleSk7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQ6IE5nT3B0aW9uID0ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiBpc09iamVjdEtleSA/ICcnIDogPHN0cmluZz5rZXksXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGkrKyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoaXMuX25nU2VsZWN0LnNlbGVjdGFibGVHcm91cCxcbiAgICAgICAgICAgICAgICBodG1sSWQ6IG5ld0lkKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSBpc0dyb3VwQnlGbiA/IHRoaXMuX25nU2VsZWN0LmJpbmRMYWJlbCA6IDxzdHJpbmc+dGhpcy5fbmdTZWxlY3QuZ3JvdXBCeTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwVmFsdWUgPSB0aGlzLl9uZ1NlbGVjdC5ncm91cFZhbHVlIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoPE5nT3B0aW9uPmtleSkudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IFtncm91cEtleV06IGtleSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGdyb3Vwcy5nZXQoa2V5KS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgeC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgeC5jaGlsZHJlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB4LmluZGV4ID0gaSsrO1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgICAgIHBhcmVudC52YWx1ZSA9IGdyb3VwVmFsdWUoa2V5LCBjaGlsZHJlbi5tYXAoeCA9PiB4LnZhbHVlKSk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKC4uLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxufVxuIl19