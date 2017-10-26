'use strict';

import Application from 'Application';
import h from 'hyperscript';
import pages from 'pages';
import 'lib/Paginator/Paginator.css';
import classNames from 'classnames';
import { sanitizeStyles } from 'lib/util';
import Config from 'lib/config';


export default class Paginator {

    constructor(arr, caller, cp = 1, rpp = Config.recordsPerPage) {
      this.name = 'Paginator';
      this.collection = arr;
      this.currentPage = cp;
      this.recordsPerPage = rpp;
      this.caller = caller
    }

    getCurrentPage() {
        return this.currentPage
    }

    getRecordsPerPage() {
        return this.recordsPerPage
    }

    setCurrentPage(page) {
        this.currentPage = page;
    }

    numPages() {
        return Math.ceil(this.collection.length / this.getRecordsPerPage());
    }

    firstPage() {
        return this.getPage(1)
    }

    lastPage() {
        return this.getPage(this.numPages())
    }

    prevPage() {
        return this.getPage(this.getCurrentPage() - 1)
    }

    nextPage(){
        return this.getPage(this.getCurrentPage() + 1)
    }

    sanitizePage(page = 1) {
        page = page < 1 ? 1 : page
        page = page > this.numPages() ? this.numPages() : page
        this.setCurrentPage(page)
        return page
    }

    getPage(page) {
        page = this.sanitizePage(page)
        let rpp = this.getRecordsPerPage()
        let fromElement = ((page - 1) * rpp)
        let toElement = (page * rpp)
        return this.collection.slice(fromElement , toElement);
    }

    drawPages() {
        const that = this
        let page = this.getCurrentPage()
        let numPages = this.numPages()
        let prevDisabled = (page == 1 || numPages == 1)
        let nextDisabled = (page == numPages || numPages == 1)

        let prevStyles = classNames('prev', {
            ['disabled']: prevDisabled
        })

        let nextStyles = classNames('next', {
            ['disabled']: nextDisabled
        })

        let html = h('div.pg-container',
                    h('div.paginator',
                        h('div.button-hidden.hidden'),
                        h(`a.${sanitizeStyles(prevStyles)}`, '', {onclick: e=> prevDisabled ? null : this.caller.render({page: page - 1})}),
                        [...Array(numPages).keys()].map(i => h(`a${(i + 1) == page? '.active': ''}`, i + 1, {onclick: e => this.caller.render({page: i + 1})})),
                        h(`a.${sanitizeStyles(nextStyles)}`, '', {onclick: e=> nextDisabled? null : this.caller.render({page: page + 1})}),
                    ),
                )
        return html
    }
}
