import Router from 'next/router';

export default (context: any, target: string) => {
  if (context?.res) {
    //server redirect
    context.res.writeHead(303, { location: target });
    context.res.end();
  } else {
    // in browser
    Router.replace(target);
  }
};
