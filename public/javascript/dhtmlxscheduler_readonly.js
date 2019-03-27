/*
@license
dhtmlxScheduler v.5.1.6 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady", function() {
    function e(e, t, a, r) {
        for (var n = t.getElementsByTagName(e), i = a.getElementsByTagName(e), d = i.length - 1; d >= 0; d--) {
            var a = i[d];
            if (r) {
                var l = document.createElement("span");
                l.className = "dhx_text_disabled", l.innerHTML = r(n[d]), a.parentNode.insertBefore(l, a), a.parentNode.removeChild(a)
            } else a.disabled = !0, t.checked && (a.checked = !0)
        }
    }
    var t = scheduler.config.lightbox.sections.slice(),
        a = scheduler.config.buttons_left.slice(),
        r = scheduler.config.buttons_right.slice();
    scheduler.attachEvent("onBeforeLightbox", function(e) {
        if (this.config.readonly_form || this.getEvent(e).readonly) {
            this.config.readonly_active = !0;
            for (var n = 0; n < this.config.lightbox.sections.length; n++) this.config.lightbox.sections[n].focus = !1
        } else this.config.readonly_active = !1, scheduler.config.lightbox.sections = t.slice(), scheduler.config.buttons_left = a.slice(), scheduler.config.buttons_right = r.slice();
        var i = this.config.lightbox.sections;
        if (this.config.readonly_active) {
            for (var n = 0; n < i.length; n++)
                if ("recurring" == i[n].type) {
                    this.config.readonly_active && i.splice(n, 1);
                    break
                }
            for (var d = ["dhx_delete_btn", "dhx_save_btn"], l = [scheduler.config.buttons_left, scheduler.config.buttons_right], n = 0; n < d.length; n++)
                for (var o = d[n], s = 0; s < l.length; s++) {
                    for (var _ = l[s], c = -1, u = 0; u < _.length; u++)
                        if (_[u] == o) {
                            c = u;
                            break
                        } - 1 != c && _.splice(c, 1)
                }
        }
        return this.resetLightbox(), !0
    });
    var n = scheduler._fill_lightbox;
    scheduler._fill_lightbox = function() {
        var t = this.getLightbox();
        this.config.readonly_active && (t.style.visibility = "hidden", t.style.display = "block");
        var a = n.apply(this, arguments);
        if (this.config.readonly_active && (t.style.visibility = "",
                t.style.display = "none"), this.config.readonly_active) {
            var r = this.getLightbox(),
                d = this._lightbox_r = r.cloneNode(!0);
            d.id = scheduler.uid(), d.className += " dhx_cal_light_readonly", e("textarea", r, d, function(e) {
                    return e.value
                }), e("input", r, d, !1), e("select", r, d, function(e) {
                    return e.options.length ? e.options[Math.max(e.selectedIndex || 0, 0)].text : ""
                }), r.parentNode.insertBefore(d, r), i.call(this, d), scheduler._lightbox && scheduler._lightbox.parentNode.removeChild(scheduler._lightbox), this._lightbox = d, scheduler.config.drag_lightbox && (d.firstChild.onmousedown = scheduler._ready_to_dnd),
                this.setLightboxSize(), d.onclick = function(e) {
                    var t = e ? e.target : event.srcElement;
                    if (t.className || (t = t.previousSibling), (!(t && t.className && scheduler._getClassName(t).indexOf("dhx_btn_set") > -1) || (t = t.querySelector("[dhx_button]"))) && (scheduler._getClassName(t) || (t = t.previousSibling), t && scheduler._getClassName(t))) switch (scheduler._getClassName(t)) {
                        case "dhx_cancel_btn":
                            scheduler.callEvent("onEventCancel", [scheduler._lightbox_id]), scheduler._edit_stop_event(scheduler.getEvent(scheduler._lightbox_id), !1),
                                scheduler.hide_lightbox()
                    }
                }, d.onkeydown = function(e) {
                    var t = e || window.event,
                        a = e.target || e.srcElement,
                        r = a.querySelector("[dhx_button]");
                    switch (r || (r = a.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (e || t).keyCode) {
                        case 32:
                            if ((e || t).shiftKey) return;
                            r && r.click && r.click();
                            break;
                        case scheduler.keys.edit_cancel:
                            scheduler.cancel_lightbox()
                    }
                }
        }
        return a
    };
    var i = scheduler.showCover;
    scheduler.showCover = function() {
        this.config.readonly_active || i.apply(this, arguments)
    };
    var d = scheduler.hide_lightbox;
    scheduler.hide_lightbox = function() {
        return this._lightbox_r && (this._lightbox_r.parentNode.removeChild(this._lightbox_r), this._lightbox_r = this._lightbox = null), d.apply(this, arguments)
    }
});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_readonly.js.map