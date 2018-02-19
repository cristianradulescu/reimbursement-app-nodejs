var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var model = require('../model/models.js');

hbs.registerHelper('statusBadge', (status_id) => {
  if (status_id == 1) {
    return 'danger';
  }

  if (status_id == 2) {
    return 'warning';
  }

  if (status_id == 3) {
    return 'success';
  }
});

/* GET documents listing. */
router.get('/', function(req, res, next) {
  model.DocumentModel.findAll(
    { 
      order: [['status_id', 'ASC'], ['updated_at', 'DESC']], 
      include: ['employee', 'status', 'type'] 
    }
  )
  .then(documents => {
      res.render(
        'documents', 
        { 
          title: 'Reimbursements',
          documents: documents
        }
      );
    })
  });

module.exports = router;
