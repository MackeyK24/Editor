var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BABYLON;
(function (BABYLON) {
    var EDITOR;
    (function (EDITOR) {
        var GUI;
        (function (GUI) {
            var GUIPanel = (function (_super) {
                __extends(GUIPanel, _super);
                /**
                * Constructor
                * @param name: panel name
                * @param type: panel type (left, right, etc.)
                * @param size: panel size
                * @param resizable: if the panel is resizable
                * @param core: the editor core
                */
                function GUIPanel(name, type, size, resizable, core) {
                    var _this = _super.call(this, name, core) || this;
                    // Public memebers
                    _this.tabs = new Array();
                    _this.size = 70;
                    _this.minSize = 10;
                    _this.maxSize = undefined;
                    _this.style = "background-color: #F5F6F7; border: 1px solid #dfdfdf; padding: 5px;";
                    _this.toolbar = null;
                    _this.type = type;
                    _this.size = size;
                    _this.resizable = resizable;
                    return _this;
                }
                // Create tab
                GUIPanel.prototype.createTab = function (tab) {
                    var _this = this;
                    // Configure event
                    tab.onClick = function (event) {
                        if (_this.onTabChanged)
                            _this.onTabChanged(event.target);
                        var ev = new EDITOR.Event();
                        ev.eventType = EDITOR.EventType.GUI_EVENT;
                        ev.guiEvent = new EDITOR.GUIEvent(_this, EDITOR.GUIEventType.TAB_CHANGED, event.target);
                        _this.core.sendEvent(ev);
                    };
                    tab.onClose = function (event) {
                        if (_this.onTabClosed)
                            _this.onTabClosed(event.target);
                        var ev = new EDITOR.Event();
                        ev.eventType = EDITOR.EventType.GUI_EVENT;
                        ev.guiEvent = new EDITOR.GUIEvent(_this, EDITOR.GUIEventType.TAB_CLOSED, event.target);
                        _this.core.sendEvent(ev);
                    };
                    // Add tab
                    this.tabs.push(tab);
                    if (this._panelElement !== null) {
                        this._panelElement.tabs.add(tab);
                    }
                    return this;
                };
                // Remove tab from id
                GUIPanel.prototype.removeTab = function (id) {
                    if (this._panelElement !== null) {
                        this._panelElement.tabs.remove(id);
                    }
                    for (var i = 0; i < this.tabs.length; i++) {
                        if (this.tabs[i].id === id) {
                            this.tabs.splice(i, 1);
                            return true;
                        }
                    }
                    return false;
                };
                Object.defineProperty(GUIPanel.prototype, "width", {
                    // Get width
                    get: function () {
                        if (this._panelElement)
                            return this._panelElement.width;
                        return 0;
                    },
                    // Set width
                    set: function (width) {
                        if (this._panelElement)
                            this._panelElement.width = width;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GUIPanel.prototype, "height", {
                    // Get height
                    get: function () {
                        if (this._panelElement)
                            return this._panelElement.height;
                        return 0;
                    },
                    // Set height
                    set: function (height) {
                        if (this._panelElement)
                            this._panelElement.height = height;
                    },
                    enumerable: true,
                    configurable: true
                });
                // Return tab count
                GUIPanel.prototype.getTabCount = function () {
                    return this.tabs.length;
                };
                // Set tab enabled
                GUIPanel.prototype.setTabEnabled = function (id, enable) {
                    if (this._panelElement === null) {
                        return this;
                    }
                    enable ? this._panelElement.tabs.enable(id) : this._panelElement.tabs.disable(id);
                    return this;
                };
                // Sets the active tab
                GUIPanel.prototype.setActiveTab = function (id) {
                    this._panelElement.tabs.select(id);
                    var ev = new EDITOR.Event();
                    ev.eventType = EDITOR.EventType.GUI_EVENT;
                    ev.guiEvent = new EDITOR.GUIEvent(this, EDITOR.GUIEventType.TAB_CHANGED, id);
                    this.core.sendEvent(ev);
                };
                // Return tab id from index
                GUIPanel.prototype.getTabIDFromIndex = function (index) {
                    if (index >= 0 && index < this.tabs.length) {
                        return this.tabs[index].id;
                    }
                    return "";
                };
                // Returns the wanted tab
                GUIPanel.prototype.getTab = function (id) {
                    var tab = this._panelElement.tabs.get(id);
                    return tab;
                };
                // Sets panel content (HTML)
                GUIPanel.prototype.setContent = function (content) {
                    this.content = content;
                    return this;
                };
                // Hides a tab
                GUIPanel.prototype.hideTab = function (id) {
                    return this._panelElement.tabs.hide(id) === 1;
                };
                // Show tab
                GUIPanel.prototype.showTab = function (id) {
                    return this._panelElement.tabs.show(id) === 1;
                };
                return GUIPanel;
            }(GUI.GUIElement));
            GUI.GUIPanel = GUIPanel;
        })(GUI = EDITOR.GUI || (EDITOR.GUI = {}));
    })(EDITOR = BABYLON.EDITOR || (BABYLON.EDITOR = {}));
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.editor.guiPanel.js.map
