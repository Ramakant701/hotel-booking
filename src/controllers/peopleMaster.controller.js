

import {PeopleMasterModel} from '../models/peopleMaster.dao';
const peopleMasterModel = new PeopleMasterModel();
export class PeopleMasterClass {
    createPeopleMaster = async (req, res) => {
        try {
            const peopleMasterBody = req.body;
            const peopleMasterCreated = await peopleMasterModel.createPeopleMaster(peopleMasterBody);
            return res.json({
                newPeopleMaster: peopleMasterCreated,
                key: 'newPeopleMaster',
                message: "PeopleMaster created successfully",

            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };

    getPeopleMasters = async (req, res) => {
        try {
            const peopleMasters = await peopleMasterModel.getPeopleMaster(req.query);
            res.json({
                peopleMasters,
                key: 'peopleMasters',
                message: "PeopleMasters fetched successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };

    getPeopleMaster = async (req, res) => {
        try {
            const peopleMaster = await peopleMasterModel.getPeopleMasterById({_id: req.params.id});
            const schemaPaths = peopleMasterModel.getPeopleMasterSchemaPaths();
            res.json({
                peopleMaster,
                key: 'peopleMaster',
                schemaPaths,
                message: "PeopleMaster fetched successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err})
        }
    };

    getPeopleMasterV1 = async (req, res) => {
        try {
            const {dashboard, select, populate, page, limit, ...reqQuery} = req.query;
            let peopleMasters;
            const schemaPaths = peopleMasterModel.getPeopleMasterSchemaPaths();
            if (dashboard) {
                peopleMasters = await peopleMasterModel.paginatePeopleMasterGet(reqQuery,select,populate,page,limit);
            } else {
                peopleMasters = await peopleMasterModel.getPeopleMaster(reqQuery);
            }
            res.json({
                peopleMasters,
                key: 'peopleMasters',
                schemaPaths,
                message: "PeopleMaster fetched successfully",

            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };

    updatePeopleMaster = async (req, res) => {
        try {
            const peopleMasterBody = req.body;
            const peopleMaster = await peopleMasterModel.updatePeopleMaster({_id: req.params.id}, peopleMasterBody);
            res.json({
                peopleMaster,
                key: 'peopleMaster',
                message: "climatesMst  updated successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };

    removePeopleMaster = async (req, res) => {
        try {
            const peopleMaster = await peopleMasterModel.deletePeopleMaster({_id: req.params.id});
            res.json({
                peopleMaster,
                key: 'peopleMaster',
                message: "PeopleMaster deleted successfully",
            });
        } catch (err) {
            res.status(500);
            res.render('error', {error: err});
        }
    };
}

