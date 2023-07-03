import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/moderators/moderatorsActions";
import { ModeratorEditDialogHeader } from "./ModeratorEditDialogHeader";
import { ModeratorEditForm } from "./ModeratorEditForm";
import { useModeratorsUIContext } from "../ModeratorsUIContext";

export function ModeratorEditDialog({ id, show, onHide }) {
  // ModeratorsUI Context
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      initModerator: moderatorsUIContext.initModerator,
    };
  }, [moderatorsUIContext]);

  // ModeratorsRedux state
  const dispatch = useDispatch();
  const { actionsLoading, moderatorForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.moderators.actionsLoading,
      moderatorForEdit: state.moderators.moderatorForEdit,
    }),
    shallowEqual
  );
  const [allows, setAllows] = useState();
  useEffect(() => {
    if (moderatorForEdit) {
      const allows = [
        {
          label: "Tableau de bord",
          checked: moderatorForEdit.allows?.menus?.dash,
          type: "menus",
          value: "dash",
        },
        {
          label: "Clients",
          checked: moderatorForEdit.allows?.menus?.clients,
          type: "menus",
          value: "clients",
        },
        {
          label: "Experts",
          checked: moderatorForEdit.allows?.menus?.experts,
          type: "menus",
          value: "experts",
        },
        {
          label: "Rapports",
          checked: moderatorForEdit.allows?.menus?.rapports,
          type: "menus",
          value: "rapports",
        },
        {
          label: "Reclamations",
          checked: moderatorForEdit.allows?.menus?.reclama,
          type: "menus",
          value: "reclama",
        },
        {
          label: "Assistances",
          checked: moderatorForEdit.allows?.menus?.assist,
          type: "menus",
          value: "assist",
        },
        {
          label: "Missions",
          checked: moderatorForEdit.allows?.menus?.missions,
          type: "menus",
          value: "missions",
        },
        {
          label: "Avis",
          checked: moderatorForEdit.allows?.menus?.avis,
          type: "menus",
          value: "avis",
        },
        {
          label: "Marques",
          checked: moderatorForEdit.allows?.configs?.marks,
          type: "configs",
          value: "marks",
        },
        {
          label: "Articles",
          checked: moderatorForEdit.allows?.configs?.articles,
          type: "configs",
          value: "articles",
        },
        {
          label: "Packs",
          checked: moderatorForEdit.allows?.configs?.packs,
          type: "configs",
          value: "packs",
        },
        {
          label: "baniéres pub",
          checked: moderatorForEdit.allows?.configs?.ads,
          type: "configs",
          value: "ads",
        },
        {
          label: "Rapport question",
          checked: moderatorForEdit.allows?.configs?.rapport,
          type: "configs",
          value: "rapport",
        },
      ];
      setAllows(allows);
    } else {
      const allows = [
        {
          label: "Tableau de bord",
          checked: false,
          type: "menus",
          value: "dash",
        },
        {
          label: "Clients",
          checked: false,
          type: "menus",
          value: "clients",
        },
        {
          label: "Experts",
          checked: false,
          type: "menus",
          value: "experts",
        },
        {
          label: "Rapports",
          checked: false,
          type: "menus",
          value: "rapports",
        },
        {
          label: "Reclamations",
          checked: false,
          type: "menus",
          value: "reclama",
        },
        {
          label: "Assistances",
          checked: false,
          type: "menus",
          value: "assist",
        },
        {
          label: "Missions",
          checked: false,
          type: "menus",
          value: "missions",
        },
        {
          label: "Avis",
          checked: false,
          type: "menus",
          value: "avis",
        },
        {
          label: "Marques",
          checked: false,
          type: "configs",
          value: "marks",
        },
        {
          label: "Articles",
          checked: false,
          type: "configs",
          value: "articles",
        },
        {
          label: "Packs",
          checked: false,
          type: "configs",
          value: "packs",
        },
        {
          label: "baniéres pub",
          checked: false,
          type: "configs",
          value: "ads",
        },
        {
          label: "Rapport question",
          checked: false,
          type: "configs",
          value: "rapport",
        },
      ];
      setAllows(allows);
    }
  }, [moderatorForEdit]);

  useEffect(() => {
    // server call for getting ad by id
    dispatch(actions.fetchModerator(id));
  }, [id, dispatch]);

  // server request for saving ad
  const saveModerator = (moderator) => {
    
    if (!id) {
      // server request for creating ad
      dispatch(actions.createModerator(moderator)).then(() => onHide());
    } else {
      // server request for updating ad
      dispatch(actions.updateModerator(moderator)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ModeratorEditDialogHeader id={id} />
      <ModeratorEditForm
        saveModerator={saveModerator}
        actionsLoading={actionsLoading}
        moderator={moderatorForEdit || moderatorsUIProps.initModerator}
        allows={allows}
        onHide={onHide}
      />
    </Modal>
  );
}
