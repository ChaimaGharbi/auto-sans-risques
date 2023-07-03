import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../../../_metronic/_partials/controls";

export function ArticlesLoadingDialog() {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.articles.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
